const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  position_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  application_date: {
    type: String,
  },
  status: {
    type: String
  }
});

module.exports = Position = mongoose.model('position', PositionSchema);