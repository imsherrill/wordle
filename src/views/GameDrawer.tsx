import React from 'react';

import {StyleSheet, View} from 'react-native';
import {colors} from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export function GameDrawer(): JSX.Element {
  return <View style={styles.container} />;
}
