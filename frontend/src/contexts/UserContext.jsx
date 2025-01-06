import React, { createContext, useContext, useState, useEffect } from "react";
// Create the UserContext
const UserContext = createContext();

// Provide context to the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Sidebar states
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  // Function to set the user details
  const loginUser = (userData) => {
    setUser(userData);
    console.log("login userData", userData);
  };

  // Function to log out the user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token"); // Clear the token
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        // Sidebar states
        isOpen,
        setIsOpen,
        isOpenProfile,
        setIsOpenProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);
