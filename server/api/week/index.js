'use strict';

var express = require('express');
var controller = require('./week.controller');
var gameController = require('../game/game.controller');

var router = express.Router();

router.get('/:userId', controller.index);
router.get('/:id/:userId', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/:id/games', gameController.index);
router.get('/:id/games/:gameId', gameController.show);

module.exports = router;
