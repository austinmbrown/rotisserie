'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PickSchema = new Schema({
  user: Number,
  game: Number,
  pick: String,
  correct: Boolean
});

module.exports = mongoose.model('Pick', PickSchema);
