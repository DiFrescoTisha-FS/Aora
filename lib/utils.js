// lib/authHelpers.js
import { getCurrentUser } from "../lib/appwrite";

export const checkUserSession = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("User is not authenticated.");
    }
    return currentUser;
  } catch (error) {
    console.error("Authentication error:", error);
    Alert.alert("Authentication Error", "Please log in to continue.");
  }
};
