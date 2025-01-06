// import React, { useEffect, useState } from 'react';
// import { fetchFriendRequests, acceptFriendRequest , rejectFriendRequest} from '../services/friendService';

// const FriendRequest = () => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     const getRequests = async () => {
//       try {
//         const result = await fetchFriendRequests();
//         setRequests(result);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getRequests();
//   }, []);

//   const handleResponse = async (requestId, action) => {
//     try {
//       if(action == "accept"){
//       await acceptFriendRequest(requestId, action);
//       setRequests(requests.filter((req) => req._id !== requestId));  // Remove request from UI
//       }
//       if(action == "reject"){
//         await rejectFriendRequest(requestId, action);
//         setRequests(requests.filter((req) => req._id !== requestId));  // Remove request from UI
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   console.log("friend requests",requests)

//   return (
//     <div>
//       <h2>Friend Requests componenet</h2>
//       <ul>
//       {requests.map((request) => (
//     <li key={request._id}>
//       {/* Display the sender's username */}
//       <p>Sender: {request.senderId.username}</p>

//       {/* Accept and Reject buttons */}
//       <button onClick={() => handleResponse(request._id, 'accept')}>
//         Accept
//       </button>
//       <button onClick={() => handleResponse(request._id, 'reject')}>
//         Reject
//       </button>
//     </li>
//   ))}
//       </ul>
//     </div>
//   );
// };

// export default FriendRequest;


import React, { useEffect, useState } from 'react';
import { fetchFriendRequests, acceptFriendRequest, rejectFriendRequest } from '../services/friendService';

const FriendRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const result = await fetchFriendRequests();
        setRequests(result);
      } catch (err) {
        console.error(err);
      }
    };

    getRequests();
  }, []);

  const handleResponse = async (requestId, action) => {
    try {
      if (action === "accept") {
        await acceptFriendRequest(requestId, action);
        setRequests(requests.filter((req) => req._id !== requestId));  // Remove request from UI
      }
      if (action === "reject") {
        await rejectFriendRequest(requestId, action);
        setRequests(requests.filter((req) => req._id !== requestId));  // Remove request from UI
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-10 pt-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-6 ">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Friend Requests</h1>
        <p className="text-lg text-gray-600">Manage your incoming friend requests here. You can accept or reject them.</p>
        <div className="w-24 my-4 border-b-4 border-blue-500"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto">
        {requests.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-xl font-semibold">No new friend requests.</p>
            <p className="text-gray-400 mt-2">Start connecting with others to receive friend requests.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {requests.map((request) => (
              <li
                key={request._id}
                className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
              >
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold">
                    {request.senderId.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{request.senderId.username}</p>
                    <p className="text-sm text-gray-500">Friend request from this user</p>
                  </div>
                </div>

                {/* Accept/Reject Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleResponse(request._id, 'accept')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleResponse(request._id, 'reject')}
                    className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
