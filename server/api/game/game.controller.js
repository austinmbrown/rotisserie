'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var request = require('request');

// Get list of games for a given week
exports.index = function(req, res) {
  request({
    url: 'https://profootballapi.com/schedule',
    method: 'POST',
    json: {
      api_key: process.env.API_KEY,
      year:'2015',
      season_type:'REG',
      week: req.params.id
    }
  }, function(error, response, body){
    if(error) {
      console.log(error);
    } else {
      return res.json(body);
    }
  });
};

// Get a single game
exports.show = function(req, res) {
  request({
    url: 'https://profootballapi.com/schedule',
    method: 'POST',
    json: {
      api_key: process.env.API_KEY,
      year:'2015',
      season_type:'REG',
      week: req.params.id
    }
  }, function(error, response, body){
    if(error) {
      console.log(error);
    } else {
      var game_object = _.findWhere(body, {id: parseInt(req.params.gameId)});
      return res.json(game_object);
    }
  });
};

// Creates a new game in the DB.
exports.create = function(req, res) {
  Game.create(req.body, function(err, game) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(game);
  });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if(!game) { return res.status(404).send('Not Found'); }
    var updated = _.merge(game, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(game);
    });
  });
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.status(404).send('Not Found'); }
    game.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
