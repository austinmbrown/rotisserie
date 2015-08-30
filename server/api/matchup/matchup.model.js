'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MatchupSchema = new Schema({
  week: {type: Schema.ObjectId, ref: 'WeekSchema'},
  homeTeam: {type: Schema.ObjectId, ref: 'TeamSchema'},
  awayTeam: {type: Schema.ObjectId, ref: 'TeamSchema'},
  dummy: String
});

module.exports = mongoose.model('Matchup', MatchupSchema);
