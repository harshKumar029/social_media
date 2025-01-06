const User = require('../models/user');
const FriendRequest = require('../models/friendRequest');

// Service to send friend request
const sendFriendRequest = async (senderId, receiverId) => {
  // Check if the user has already sent a friend request
  const existingRequest = await FriendRequest.findOne({ senderId, receiverId });
  if (existingRequest) {
    throw new Error('Friend request already sent');
  }
  
  console.log("existingRequest", existingRequest);

  // Create a new friend request
  const friendRequest = new FriendRequest({
    senderId,  // Use senderId and receiverId to match the schema
    receiverId,
  });
  
  console.log("Creating new friend request:", friendRequest);

  // Save the new friend request
  const savedRequest = await friendRequest.save();
  console.log("saved request:", savedRequest);

  return 'Friend request sent';
};

// Service to accept friend request
const acceptFriendRequest = async (requestId) => {
  const request = await FriendRequest.findById(requestId);
  if (!request || request.status !== 'pending') {
    throw new Error('Invalid or non-pending request');
  }

  console.log("request in acceptFriendRequest", request);

  // Update the friend request status
  request.status = 'accepted';
  const updatedRequest = await request.save();
  console.log("updatedRequest", updatedRequest);

  // Add friends to both users
  const sender = await User.findById(request.senderId);  // Use senderId here
  const receiver = await User.findById(request.receiverId);  // Use receiverId here
  console.log("receiver", receiver, "sender", sender);

  // Check if the users are found
  if (!sender || !receiver) {
    throw new Error('User(s) not found');
  }

  sender.friends.push(receiver._id);
  receiver.friends.push(sender._id);

  await sender.save();
  await receiver.save();

  return 'Friend request accepted';
};

// Service to reject friend request
const rejectFriendRequest = async (requestId) => {
  const request = await FriendRequest.findById(requestId);
  if (!request || request.status !== 'pending') {
    throw new Error('Invalid or non-pending request');
  }

  // Update the friend request status
  request.status = 'rejected';
  await request.save();

  return 'Friend request rejected';
};

// Service to remove a friend
const removeFriend = async (userId, friendId) => {
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  // Remove from friends list
  user.friends.pull(friendId);
  friend.friends.pull(userId);

  await user.save();
  await friend.save();

  return 'Friend removed';
};

const searchUsers = async (query) => {
  try {
    const users = await User.find({
      username: { $regex: query, $options: 'i' }, // Case-insensitive search by username
    })
      .limit(10)
      .lean(); // Optional: lean() for performance boost if full Mongoose docs aren't needed

    if (users.length === 0) {
      return []; // Returning an empty array if no users are found
    }

    return users;
  } catch (error) {
    throw new Error('Error searching for users: ' + error.message); // More descriptive error message
  }
};

// Fetch friend requests for the user (received requests)
const fetchFriendRequests = async (userId) => {
  try {
    const friendRequests = await FriendRequest.find({
      receiverId: userId,
      status: 'pending',
    }).populate('senderId', 'username email'); // Populate sender details (optional)
    return friendRequests;
  } catch (error) {
    throw new Error('Error fetching friend requests');
  }
};

// Get Friend List
const getFriendList = async (userId) => {
  const user = await User.findById(userId).populate('friends', 'username email');
  if (!user) {
    throw new Error('User not found');
  }
  console.log("user",user.friends);
  return user.friends;
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  searchUsers,
  fetchFriendRequests,
  getFriendList,
};