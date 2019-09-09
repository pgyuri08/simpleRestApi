const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  position: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Employee', PostSchema);
