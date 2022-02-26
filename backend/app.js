const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const placesRoute = require('./routes/places-routes');
const userRoute = require('./routes/users-routes')
const HttpError = require('./models/http-error');

const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.iu28p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to Database :)");
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
})
app.use('/uploads/images/', express.static(path.join('uploads','images')))
app.use('/api/places',placesRoute);
app.use('/api/users',userRoute);

app.use((req, res, next)=>{
    throw new HttpError('This route is not supported by me',404);
});

app.use((error, req, res, next) =>{
    if(req.file){
        fs.unlink(req.file.path, err =>{
            console.log(err);
        })
    }
    if(res.headerSent){
        return next(error);
    }else{
        console.log(error.message);
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occured!'})}
});



app.listen(port, ()=>{
    console.log(`Connected to port ${port} `)
})