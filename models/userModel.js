const mongoose = require('mongoose');

//simple schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  userType: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});


const user = mongoose.model('User', UserSchema);
exports.User = user; 
