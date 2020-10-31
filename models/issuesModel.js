const mongoose = require('mongoose');

//simple schema
const IssuesSchema = new mongoose.Schema({
  issuesNumber: {
    type: String,
    required: true,
    maxlength: 50
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }
  ]
});


const issues = mongoose.model('Issues', IssuesSchema);
exports.Issues = issues; 
