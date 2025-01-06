// import React, { useState, useEffect } from 'react';
// import { getFriendList } from '../services/friendService';

// const FriendList = () => {
//   const [friends, setFriends] = useState([]); // State for storing friends
//   const [loading, setLoading] = useState(true); // State for loading indicator

//   // Fetch friend list when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getFriendList(); // Fetch the friends list from your backend
//         console.log("Fetched friends data:", response);

//         // Extract the friends array from the response and set it
//         if (response && response.friends) {
//           setFriends(response.friends);
//         } else {
//           console.warn("No friends found in the response.");
//         }
//       } catch (error) {
//         console.error("Error fetching friends:", error.message); // Handle errors
//       } finally {
//         setLoading(false); // Stop loading after the request is complete
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array means this effect runs only once when the component mounts

//   return (
//     <div>
//       <h2>Your Friends</h2>
//       {loading ? (
//         <p>Loading...</p> // Show loading text while fetching data
//       ) : (
//         <>
//           {friends.length === 0 ? (
//             <p>You have no friends yet.</p> // Display a message if no friends
//           ) : (
//             <ul>
//               {friends.map((friend) => (
//                 <li key={friend._id}>
//                   <span>{friend.username}</span> {/* Display each friend's username */}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default FriendList;

// import React, { useState, useEffect } from 'react';
// import { getFriendList } from '../services/friendService';

// const FriendList = () => {
//   const [friends, setFriends] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getFriendList();
//         if (response && response.friends) {
//           setFriends(response.friends);
//         } else {
//           console.warn("No friends found in the response.");
//         }
//       } catch (error) {
//         console.error("Error fetching friends:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Friends</h2>
//         {loading ? (
//           <div className="flex justify-center items-center h-32">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : friends.length === 0 ? (
//           <div className="text-center text-gray-500 bg-white shadow-md rounded-md p-6">
//             <p className="text-lg font-medium">You have no friends yet.</p>
//           </div>
//         ) : (
//           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {friends.map((friend) => (
//               <li
//                 key={friend._id}
//                 className="bg-white shadow-md rounded-md p-4 flex items-center space-x-4"
//               >
//                 <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold text-lg">
//                   {friend.username.charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-800">{friend.username}</p>
//                   <p className="text-sm text-gray-500">Friend ID: {friend._id}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FriendList;

import React, { useState, useEffect } from "react";
import { getFriendList } from "../services/friendService";

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFriendList();
        if (response && response.friends) {
          setFriends(response.friends);
        }
      } catch (error) {
        console.error("Error fetching friends:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen px-10 pt-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Meet Your Squad 
        </h1>
        <p className="text-lg text-gray-600">
          Discover your amazing friends and connections. Keep building your
          circle!
        </p>
        <div className="w-20  my-4 border-b-4 border-blue-500"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto mt-8">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
          </div>
        ) : friends.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-2xl font-semibold text-gray-700">
              Oops! No friends found 😢
            </p>
            <p className="text-gray-500 mt-2">
              Start connecting with people to grow your network!
            </p>
            <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full shadow-md transition">
              Search Friends Now
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friends.map((friend) => (
            <li
              key={friend._id}
              className="bg-white shadow-md rounded-md p-4 flex items-center space-x-4"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-lg font-bold mb-4 shadow-md">
                {friend.username.charAt(0).toUpperCase()}
              </div>
  
              <div>
                <p className="font-semibold text-gray-800">{friend.username}</p>
                <p className="text-sm text-gray-500">User ID: {friend._id}</p>
              </div>
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
};

export default FriendList;
