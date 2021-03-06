const mongoose = require('mongoose');

const task = mongoose.Schema({
  column_id: String,
  column_title: String,
  title: String,
  description: String,
  person: String,
  color: String,
});

module.exports = mongoose.model('Task', task);
