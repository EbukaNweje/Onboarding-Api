const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true, // Unique email for each user
  },

  password: {
    type: String,
    required: true,
  },

 phoneNumber: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    required: false,
  },
 
  verify: {
    type: Boolean,
    default: false,
  },

  verifyEmailToken: {
    type: String
  },

  isAdmin: {
    // Role of user it will be (normal or admin )
    type: Boolean,
    default: false,
  },

}, {timestamps: true});

module.exports = User = mongoose.model('User', UserSchema )

