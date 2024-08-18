import React, { useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { View, TouchableOpacity, Image } from 'react-native';

const SimpleVideoTest = () => {
  const [play, setPlay] = useState(false);

  const testVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {play ? (
        <Video
          source={{ uri: testVideoUrl }}
          style={{ width: 300, height: 200 }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onError={(error) => console.error('Video error:', error)}
        />
      ) : (
        <TouchableOpacity onPress={() => setPlay(true)}>
          <Image
            source={{ uri: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }}
            style={{ width: 300, height: 200 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SimpleVideoTest;
