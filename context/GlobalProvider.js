import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { Alert } from "react-native";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser(); // Fetch the current user
        if (user) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          // Handle case where no user is found
          setIsLoggedIn(false);
          setUser(null);
          Alert.alert("Error", "No user found. Please log in.");
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error fetching user:", error);
        Alert.alert("Error", "Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false); // End the loading state
      }
    };

    fetchUser(); // Call the function on component mount
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
