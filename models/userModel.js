const mongoose = require('mongoose');

// Define a schema for the User model
const userSchema = new mongoose.Schema({
    username: String,   // The user's display name from Google
    googleID: String,   // The unique Google ID for the user
    thumbnail: String   // The URL of the user's profile picture from Google
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;
