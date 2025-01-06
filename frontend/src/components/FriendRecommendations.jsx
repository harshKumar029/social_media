// import React, { useState, useEffect } from 'react';
// import { getFriendRecommendations } from '../services/recommendationService';  // Adjust path as needed
// import { sendFriendRequest } from '../services/friendservice';  // Import sendFriendRequest function

// const FriendRecommendations = () => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch recommendations when the component mounts
//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       try {
//         const data = await getFriendRecommendations();  // Call the API function
//         console.log('Recommended Friends:', data);  // Log the data
//         setRecommendations(data);  // Set the recommendations state
//       } catch (error) {
//         console.error('Error fetching recommendations:', error);
//       } finally {
//         setLoading(false);  // Stop loading after the API call completes
//       }
//     };

//     fetchRecommendations();
//   }, []);  // Empty dependency array, so the effect runs only once

//   // Handle sending a friend request
//   const handleSendRequest = async (receiverId) => {
//     try {
//       const response = await sendFriendRequest(receiverId);  // Call sendFriendRequest from the service
//       alert('Friend request sent successfully!');
//       console.log(response);  // You can log the response if needed
//     } catch (error) {
//       alert('Failed to send friend request');
//       console.error('Error sending friend request:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Friend Recommendations</h2>
//       {loading ? (
//         <p>Loading...</p>  // Display loading message while fetching data
//       ) : (
//         <>
//           {recommendations.length === 0 ? (
//             <p>No friend recommendations at this time.</p>  // Message when no recommendations are available
//           ) : (
//             <ul>
//               {recommendations.map((recommendation) => (
//                 <li key={recommendation.recommendedFriend._id}>
//                   <h3>{recommendation.recommendedFriend.username}</h3>
//                   <p>Email: {recommendation.recommendedFriend.email}</p>
//                   <p>Mutual Friends: {recommendation.mutualFriendCount}</p>
//                   <button onClick={() => handleSendRequest(recommendation.recommendedFriend._id)}>
//                     Send Friend Request
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default FriendRecommendations;

import React, { useState, useEffect } from 'react';
import { getFriendRecommendations } from '../services/recommendationService';  // Adjust path as needed
import { sendFriendRequest } from '../services/friendservice';  // Import sendFriendRequest function

const FriendRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getFriendRecommendations();
        console.log('Recommended Friends:', data);
        setRecommendations(data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleSendRequest = async (receiverId) => {
    try {
      const response = await sendFriendRequest(receiverId);
      alert('Friend request sent successfully!');
      console.log(response);
    } catch (error) {
      alert('Failed to send friend request');
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-10 pt-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto  mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">People You May Know</h2>
        <p className="text-lg text-gray-600 mt-2">Explore people you may know and send them friend requests.</p>
        <div className="w-24 my-4 border-b-4 border-blue-500 "></div>
      </div>

      {/* Recommendations Section */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
            <span className="text-lg text-gray-600">Loading recommendations...</span>
          </div>
        ) : (
          <>
            {recommendations.length === 0 ? (
              <p className="text-center text-lg text-gray-500 mt-10">No recommendations available at this time.</p>
            ) : (
              <ul className="space-y-6">
                {recommendations.map((recommendation) => (
                  <li key={recommendation.recommendedFriend._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                    <div className="flex items-center space-x-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold">
                        {recommendation.recommendedFriend.username.charAt(0).toUpperCase()}
                      </div>

                      {/* User Information */}
                      <div>
                        <p className="font-semibold text-gray-800">{recommendation.recommendedFriend.username}</p>
                        <p className="text-gray-500">{recommendation.recommendedFriend.email}</p>
                        <p className="text-sm text-gray-600">Mutual Friends: {recommendation.mutualFriendCount}</p>
                      </div>
                    </div>

                    {/* Send Friend Request Button */}
                    <div className="mt-4">
                      <button
                        onClick={() => handleSendRequest(recommendation.recommendedFriend._id)}
                        className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
                      >
                        Send Friend Request
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendRecommendations;
