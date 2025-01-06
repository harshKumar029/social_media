const friendService = require("../services/friendService");

const sendFriendRequest = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.userId;

  console.log("send FriendRequest", senderId, receiverId);

  try {
    const message = await friendService.sendFriendRequest(senderId, receiverId);
    console.log("message",message);
    res.status(201).json({ message });
  } catch (error) {
    console.log("error in sendFriendRequest",error)
    res.status(400).json({ message: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  console.log("ths is requestId",requestId);
  try {
    const message = await friendService.acceptFriendRequest(requestId);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const rejectFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const message = await friendService.rejectFriendRequest(requestId);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to fetch friend requests
const getFriendRequests = async (req, res) => {
  const userId = req.userId; // Get userId from the auth middleware

  try {
    const requests = await friendService.fetchFriendRequests(userId);
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to search users by query
const searchUsersController = async (req, res) => {
    const { query } = req.query;
    console.log("query", query);
  
    // If the query is empty, return an empty array or an appropriate response
    if (!query.trim()) {
      return res.status(200).json([]);
    }
  
    console.log("query is not empty");
  
    try {
      // Call the service to search users
      const users = await friendService.searchUsers(query);
      console.log("this is user ", users);
  
      // Exclude the password field manually
      const usersWithoutPassword = users.map((user) => {
        // Create a new object excluding the password field
        const { password, ...userWithoutPassword } = user; // No need for .toObject()
        return userWithoutPassword;
      });
  
      console.log(usersWithoutPassword);
      res.status(200).json(usersWithoutPassword); // Send the search results as response without password
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    }
  };

  // Get Friend List
const getFriendList = async (req, res) => {
    const userId = req.userId;
    console.log("userId",userId);
  
    try {
      const friends = await friendService.getFriendList(userId);
    //   console.log("getFriendList friends",friends);
      res.status(200).json({ friends });
    } catch (error) {
        console.log("getFriendList",error);
      res.status(400).json({ message: error.message });
    }
  };
  

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  searchUsersController,
  getFriendRequests,
  getFriendList,
};
