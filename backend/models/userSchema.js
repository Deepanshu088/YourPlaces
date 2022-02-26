const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, requied: true, unique: true },
    password: { type: String, required: true},
    image: { type: String, required: true },
    places: [{type: mongoose.Types.ObjectId, required: true, ref: 'Place'}]
});

module.exports = mongoose.model('User', userSchema);