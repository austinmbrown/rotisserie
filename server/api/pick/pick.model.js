'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PickSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  game: Number,
  pick: String,
  correct: Boolean
});

module.exports = mongoose.model('Pick', PickSchema);

PickSchema.methods = {
  evaluateCorrect: function() {
    // get the game via /api/weeks/:weekId/games/:gameId
    // if final == 1
    // compare home_score and away_score determines winner
    // winner == pick
    // return boolean
  }
}
