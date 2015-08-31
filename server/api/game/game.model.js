'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  week: Number,
  homeTeam: String,
  awayTeam: String,
  winner: String
});

module.exports = mongoose.model('Game', GameSchema);
