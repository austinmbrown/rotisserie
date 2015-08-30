'use strict';

var _ = require('lodash');
var Matchup = require('./matchup.model');

// Get list of matchups
exports.index = function(req, res) {
  Matchup.find(function (err, matchups) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(matchups);
  });
};

// Get a single matchup
exports.show = function(req, res) {
  Matchup.findById(req.params.id, function (err, matchup) {
    if(err) { return handleError(res, err); }
    if(!matchup) { return res.status(404).send('Not Found'); }
    return res.json(matchup);
  });
};

// Creates a new matchup in the DB.
exports.create = function(req, res) {
  Matchup.create(req.body, function(err, matchup) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(matchup);
  });
};

// Updates an existing matchup in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Matchup.findById(req.params.id, function (err, matchup) {
    if (err) { return handleError(res, err); }
    if(!matchup) { return res.status(404).send('Not Found'); }
    var updated = _.merge(matchup, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(matchup);
    });
  });
};

// Deletes a matchup from the DB.
exports.destroy = function(req, res) {
  Matchup.findById(req.params.id, function (err, matchup) {
    if(err) { return handleError(res, err); }
    if(!matchup) { return res.status(404).send('Not Found'); }
    matchup.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}