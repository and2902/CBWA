const mongoose = require('mongoose');

//simple schema
const CommentsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 550
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});


const comments = mongoose.model('Comments', CommentsSchema);
exports.Comments = comments; 
