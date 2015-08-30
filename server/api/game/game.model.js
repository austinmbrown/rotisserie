'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  week: {type: Schema.ObjectId, ref: 'WeekSchema'},
  homeTeam: {type: Schema.ObjectId, ref: 'TeamSchema'},
  awayTeam: {type: Schema.ObjectId, ref: 'TeamSchema'}
});

module.exports = mongoose.model('Game', GameSchema);
