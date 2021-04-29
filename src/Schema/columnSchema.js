const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const column = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
});

module.exports = mongoose.model('Column', column);
