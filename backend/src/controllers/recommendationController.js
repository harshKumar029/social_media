const User = require('../models/user');
const Recommendation = require('../models/recommendation');

// Recommend Friends Based on the Number of Mutual Friends
const recommendFriends = async (req, res) => {
    const userId = req.userId; // The user asking for recommendations
  
    try {
      // Fetch the user and their friends
      const user = await User.findById(userId).populate('friends');
      const friendsOfUser = user.friends.map(friend => friend._id.toString()); // Get the list of friends' IDs
  
      // Find other users who share mutual friends
      const recommendations = await User.find({ 
        _id: { $ne: userId },  // Don't recommend the user themselves
        friends: { $in: friendsOfUser }  // Check if the other user's friends match the user's friends
      })
        .populate('friends')  // Get the friends information of the recommended users
        .limit(5);  // Limit the number of recommendations (optional)
  
      // Map the results to the format we want
      const recommendedFriends = recommendations.map(friend => {
        // Count the number of mutual friends
        const mutualFriends = friend.friends.filter(friend => friendsOfUser.includes(friend._id.toString())).length;
  
        return {
          recommendedFriend: {
            _id: friend._id,
            username: friend.username,
            email: friend.email,
            mutualFriendCount: mutualFriends,
          },
          reason: `Mutual friends: ${mutualFriends}`,  // Reason for recommendation
          mutualFriendCount: mutualFriends,  // Optional: Include count of mutual friends
        };
      });
  
      res.json(recommendedFriends); // Send back the recommendations
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { recommendFriends };
