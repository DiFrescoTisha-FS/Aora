module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Correct if you're using Expo
    plugins: ['nativewind/babel'],  // Correct for NativeWind
  };
};
