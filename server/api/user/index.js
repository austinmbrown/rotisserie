'use strict';

var express = require('express');
var controller = require('./user.controller');
var pickController = require('../pick/pick.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

router.get('/:id/picks', pickController.index);
router.post('/:id/picks', pickController.create);
router.get('/:id/picks/:pickId', pickController.show);

module.exports = router;
