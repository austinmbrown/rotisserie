'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  totalWins: Number,
  totalLosses: Number
});

module.exports = mongoose.model('Team', TeamSchema);
