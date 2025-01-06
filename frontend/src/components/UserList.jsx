// // import React, { useEffect, useState } from 'react';
// // import { searchUsers } from '../services/friendService';

// // const UserList = ({ onFriendRequest }) => {
// //   const [users, setUsers] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

// //   useEffect(() => {
// //     const debounceTimer = setTimeout(() => {
// //       setDebouncedQuery(searchQuery); // Update debounced query after a delay
// //     }, 500); // 500ms delay

// //     // Cleanup function to clear the timer on component unmount or query change
// //     return () => clearTimeout(debounceTimer);
// //   }, [searchQuery]);

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       if (debouncedQuery.trim() === '') {
// //         setUsers([]); // Clear users when the search query is empty
// //         return;
// //       }

// //       try {
// //         const result = await searchUsers(debouncedQuery); // Fetch users with debounced query
// //         console.log('searchQuery', result);
// //         setUsers(result); // Set filtered users
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };

// //     if (debouncedQuery.trim() !== '') {
// //       fetchUsers();
// //     } else {
// //       setUsers([]); // Ensure users are cleared when the query is empty
// //     }
// //   }, [debouncedQuery]); // Trigger fetch only when debouncedQuery changes

// //   return (
// //     <div>
// //       <input
// //         type="text"
// //         placeholder="Search users"
// //         value={searchQuery}
// //         onChange={(e) => setSearchQuery(e.target.value)} // Update search query on each change
// //       />
// //       <ul>
// //         {users.length > 0 ? (
// //           users.map((user) => (
// //             <li key={user._id}>
// //               {user.username}
// //               <button onClick={() => onFriendRequest(user._id)}>Add Friend</button>
// //             </li>
// //           ))
// //         ) : (
// //           <li>No users found</li> // Display when no users match the search
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default UserList;

// import React, { useEffect, useState } from 'react';
// import { searchUsers, sendFriendRequest } from '../services/friendService'; // Ensure these services exist

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       setDebouncedQuery(searchQuery); // Update debounced query after a delay
//     }, 500); // 500ms delay

//     // Cleanup function to clear the timer on component unmount or query change
//     return () => clearTimeout(debounceTimer);
//   }, [searchQuery]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (debouncedQuery.trim() === '') {
//         setUsers([]); // Clear users when the search query is empty
//         return;
//       }

//       try {
//         const result = await searchUsers(debouncedQuery); // Fetch users with debounced query
//         console.log('searchQuery', result);
//         setUsers(result); // Set filtered users
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     if (debouncedQuery.trim() !== '') {
//       fetchUsers();
//     } else {
//       setUsers([]); // Ensure users are cleared when the query is empty
//     }
//   }, [debouncedQuery]);

//   // Define the handleFriendRequest function
//   const handleFriendRequest = async (userId) => {
//     try {
//       const response = await sendFriendRequest(userId); // Call the API to send a friend request
//       console.log(`Friend request sent to user ${userId}:`, response);
//     } catch (err) {
//       console.error(`Failed to send friend request to user ${userId}:`, err);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search users"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)} // Update search query on each change
//       />
//       <ul>
//         {users.length > 0 ? (
//           users.map((user) => (
//             <li key={user._id}>
//               {user.username}
//               <button onClick={() => handleFriendRequest(user._id)}>Add Friend</button>
//             </li>
//           ))
//         ) : (
//           <li>No users found</li> // Display when no users match the search
//         )}
//       </ul>
//     </div>
//   );
// };

// export default UserList;

import React, { useEffect, useState } from "react";
import { searchUsers, sendFriendRequest } from "../services/friendService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (debouncedQuery.trim() === "") {
        setUsers([]);
        return;
      }

      try {
        const result = await searchUsers(debouncedQuery);
        console.log("searchQuery", result);
        setUsers(result);
      } catch (err) {
        console.error(err);
      }
    };

    if (debouncedQuery.trim() !== "") {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [debouncedQuery]);

  // Handle the friend request action
  const handleFriendRequest = async (userId) => {
    try {
      const response = await sendFriendRequest(userId);
      console.log(`Friend request sent to user ${userId}:`, response);
    } catch (err) {
      console.error(`Failed to send friend request to user ${userId}:`, err);
    }
  };

  return (
    <div className="min-h-screen bg-[white] flex flex-col items-center">
      {/* Search Bar */}
      <div className="w-full p-2 bg-white shadow-md mb-6">
  <input
    type="text"
    placeholder="Search for users..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
  />
</div>


      {/* User List Section */}
      <div className="flex-1 w-full max-w-4xl ">
        <div className="space-y- ">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className=" border-b border-[#808080a5] b-[#f5f5f5] px-2 py-1 "
              >
                {/* User Avatar */}
                <div className="flex flex-row ">
                <div className="flex-shrink-0 mr-1 lg:flex hidden mb-4 sm:mb-0">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.username}&background=00000099&color=fff`} // Placeholder avatar
                    alt={user.username}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </div>

                {/* User Info */}
                <div className="">
                  <span className="text-lg font-semibold text-gray-800">
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </span>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                </div>

                {/* Add Friend Button */}
                <button
                  onClick={() => handleFriendRequest(user._id)}
                  className="mt-4 w-6 sm:mt-0 sm:ml-auto flex  text-gray-500 rounded-full hover:bg-indigo-700 focus:outline-none transition-all duration-300"
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 21V15M16 18H22M12 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {/* ADD Friend */}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
