const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleID: String,
    thumbnail: String
});

//User ek model hai, 
const User = mongoose.model('user', userSchema);
module.exports = User;