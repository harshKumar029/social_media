const express = require('express');
const router = express.Router();
const { recommendFriends } = require('../controllers/recommendationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, recommendFriends);

module.exports = router;
