'use strict';

var _ = require('lodash');
var Week = require('./week.model');
var Pick = require('../pick/pick.model');
var request = require('request');

// Get list of weeks
exports.index = function(req, res) {
  request({
    url: 'https://profootballapi.com/schedule',
    method: 'POST',
    json: {
      api_key: process.env.API_KEY,
      year:'2015',
      season_type:'REG'
    }
  }, function(error, response, body){
    if(error) {
      console.log(error);
    } else {
      Pick.find({user: req.params.userId}, function(err, picks) {
        if(err) { return handleError(res, err); }
        var gamesList = body.map(function(game){
          game["pick"] = _.result(_.find(picks, function(userPick){
            return userPick.game == game.id;
          }), "pick");
          if (!game["pick"]) {
            game["pick"] = "";
          }
          return game
        });
        return res.json(gamesList);
      });
    };
  });
};

// Get a single week
exports.show = function(req, res) {
  console.log(req.params);
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
      Pick.find({user: req.params.userId}, function(err, picks) {
        if(err) { return handleError(res, err); }
        var gamesList = body.map(function(game){
          game["pick"] = _.find(picks, function(userPick){
            return userPick.game == game.id;
          });
          if (!game["pick"]) {
            game["pick"] = {};
          }
          return game
        });
        return res.json(gamesList);
      });
    }
  });
};

// Creates a new week in the DB.
exports.create = function(req, res) {
  Week.create(req.body, function(err, week) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(week);
  });
};

// Updates an existing week in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Week.findById(req.params.id, function (err, week) {
    if (err) { return handleError(res, err); }
    if(!week) { return res.status(404).send('Not Found'); }
    var updated = _.merge(week, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(week);
    });
  });
};

// Deletes a week from the DB.
exports.destroy = function(req, res) {
  Week.findById(req.params.id, function (err, week) {
    if(err) { return handleError(res, err); }
    if(!week) { return res.status(404).send('Not Found'); }
    week.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
