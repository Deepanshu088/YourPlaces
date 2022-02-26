const {validationResult} = require('express-validator');
const fs = require('fs');
const mongoose = require('mongoose');
const HttpError = require("../models/http-error");
const uuid = require('uuid').v4;
const Place = require('../models/placesSchema');
const User = require('../models/userSchema');
const geoCoder = require('./geoCoder');

const getPlaceById = async(req,res,next)=>{
    const placeId = req.params.pid;
    let place;
    try{
        place = await Place.findById(placeId);
    }catch(e){
        return(next(new HttpError('Could not found place with this place id!!', 404)))
    }
    res.json({place});
};

const getPlacesByUserId = async(req,res,next)=>{
    const userId = req.params.uid;
    let place;
    try{
        userPlaces = await User.findById(userId).populate('places');
    }catch(e){
        return(next(new HttpError('Could not found places registered with this user id!! Try again Later', 404)))
    }
    if(!userPlaces){
        return( next(new HttpError('Could not found places registered with this user id!!', 404)) )
    }
    
    if(userPlaces.length === 0){
        return next(new HttpError('There is no place registered with this user id!!',404));
    }

    res.json({places: userPlaces.places});
}

const createPlace = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return(next(new HttpError('Invalid inputs passed!! please check the inputs', 422)));
    }

    const { title, description, address, image } = req.body;
    const coordinate = await geoCoder(address);
    const coordinates = {
        lat: coordinate[0].latitude,
        lng: coordinate[0].longitude
    }
    let user;
    try{
        user = await User.findById(req.userData.userId);
    }catch(e){
        console.log(e.message)
        return(next(new HttpError('Could not save the data. Creating Place failed!!', 500)))
    }

    if( !user ){
        return(next(new HttpError('Could not find the user of this UserId', 404)))
    }

    const newPlace = new Place({
        title,
        description,
        location: coordinates,
        address,
        creator: req.userData.userId,
        image: image
    });
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newPlace.save({session: sess});
        user.places.push(newPlace);
        await user.save({session: sess});
        await sess.commitTransaction();

    }catch(e){
        console.log(e.message)
        return(next(new HttpError('Could not save the data', 500)))
    }

    return res.status(201).json({place: newPlace}); 
}

const updatePlace = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return(next(new HttpError('Invalid inputs passed!! please check the inputs', 422)))
    }
    const pid = req.params.pid;  
    const {title, description} = req.body;
    let existingPlace;
    try{
        existingPlace = await Place.findById(pid);
    }catch(e){
        return(next(new HttpError('Couldnt find the place some server error', 500)))
    }

    if(existingPlace.creator.toString() !== req.userData.userId){
        return (next(new HttpError('Your are not allowed to update this place.', 401)))
    }

    try{
        existingPlace = await Place.findByIdAndUpdate(pid, {
            title,
            description
        }, {useFindAndModify: false});
    }catch(e){
        return(next(new HttpError('Couldnt update the place some server error', 500)))
    }

    res.status(200).json({place: existingPlace});
}

const deletePlace = async(req, res, next)=>{
    const pid = req.params.pid;
    let existingPlace;
    try{
        existingPlace = await Place.findById(pid).populate('creator','-password');
    }catch(e){
        return (next(new HttpError('Couldnt find the place some server error', 500)))
    }
    if(!existingPlace) {
        return ( next(new HttpError('Couldnt find place for this placeId', 404)));
    }
    const placeImage = existingPlace.image;
    if(existingPlace.creator._id.toString() !== req.userData.userId){
        return (next(new HttpError('Your are not allowed to delete this place.', 401)))
    }
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await existingPlace.remove({session: sess});
        existingPlace.creator.places.pull(existingPlace);
        await existingPlace.creator.save({session: sess});
        await sess.commitTransaction();
    }catch(e){
        return (next(new HttpError('Couldnt delete the place!! Try again later..', 500)))
    }
    try{
        await fs.unlink(placeImage, err =>{
            console.log('Error',err);
        })
    }catch(e){
        console.log('Error',e);
    }

    res.status(200).json({message: 'Deleted Place!'})
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;