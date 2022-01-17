import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Grid} from './Grid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 20,
  },
});

export function Game() {
  return (
    <View style={styles.container}>
      <Grid />
    </View>
  );
}
