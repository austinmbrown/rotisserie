'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WeekSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  games: Array
});

module.exports = mongoose.model('Week', WeekSchema);
