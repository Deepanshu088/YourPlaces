const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    title: { type: String, required: true },
    description : { type: String, required: true, minLenght: 5 },
    address: { type: String, required: true },
    image: { type: String, required: true},
    location: {
        lat: { type: String, required: true},
        lng: { type: String, required: true}
    },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
})


module.exports = mongoose.model('Place', placeSchema);