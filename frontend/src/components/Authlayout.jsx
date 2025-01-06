// import React from 'react';
// import SideBar from './SideBar';
// import UserList from './UserList';


// const AuthLayout = ({ children }) => {



//     return (
//         <div className="flex">
//             <div className="fixed h-full z-[1000]">
//                 <SideBar />
//             </div>
            
//             <div className="w-[100%] lg:w-[85%] md:w-[78%] ml-auto">
//                 {children}
//             </div>
//             <div className="fixed h-full z-[1000]">
// <UserList/>
//             </div>
//         </div>
//     );
// };

// export default AuthLayout;

import React from 'react';
import SideBar from './SideBar';
import UserList from './UserList';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-full">
      {/* Sidebar on the left */}
      <div className="fixed h-full z-[1000] md:w-[15%]">
        <SideBar />
      </div>

      {/* Main content at the center */}
      <div className="md:ml-[10%] w-full md:w-[76%] flex justify-center">
        <div className="w-[100%] lg:w-[85%] md:w-[78%]">
          {children}
        </div>
      </div>

      {/* UserList on the extreme right */}
      <div className="fixed hidden md:block right-0 h-full z-[1000] w-[18%]">
        <UserList />
      </div>
    </div>
  );
};

export default AuthLayout;

