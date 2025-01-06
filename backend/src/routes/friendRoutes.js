const express = require('express');
const router = express.Router();
const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, searchUsersController, getFriendRequests, getFriendList} = require('../controllers/friendController'); 
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/send', authMiddleware, sendFriendRequest);
router.post('/accept', authMiddleware, acceptFriendRequest);
router.post('/reject', authMiddleware, rejectFriendRequest);
router.get('/search', authMiddleware, searchUsersController);
router.get('/requests', authMiddleware, getFriendRequests); 
router.get('/getFriendList',authMiddleware, getFriendList);

module.exports = router;
