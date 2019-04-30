import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading = () => (
  <LinearGradient colors={['#242D3C', '#354350', '#516170']} style={styles.container}>
    <ActivityIndicator size="large" />
  </LinearGradient>
);

export default Loading;