import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import EmptyState from '../../components/EmptyState';
import InfoBox from "../../components/InfoBox";
import VideoCard from '../../components/VideoCard';
import { checkUserSession } from "../../lib/utils";
import { router } from "expo-router";
import { icons } from "../../constants";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, loading } = useAppwrite(() => getUserPosts(user.$id)); // Ensure to include `loading` from `useAppwrite`

  useEffect(() => {
    const authenticateUser = async () => {
      const authenticatedUser = await checkUserSession();
      if (!authenticatedUser) {
        router.replace('/sign-in');
        return; // Stop further execution if the user is not authenticated
      }
      setUser(authenticatedUser); // Set the authenticated user in the global context
    };

    authenticateUser();
  }, []);

  const logout = async () => {
    try {
      await signOut(); // Sign out the user and delete the session
      setUser(null); // Clear the user state in the global context
      setIsLoggedIn(false); // Update the global logged-in state
      router.replace('/sign-in'); // Redirect to sign-in page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full">
        <View className="flex justify-center items-center h-full">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6" 
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
