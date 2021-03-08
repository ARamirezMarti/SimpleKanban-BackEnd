const mongoose = require('mongoose');

const column = mongoose.Schema({
  column_id: String,
  title: String,
});

module.exports = mongoose.model('Column', column);
