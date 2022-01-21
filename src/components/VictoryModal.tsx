import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: colors.unknown,
  },
  victory: {
    color: colors.success,
    fontSize: 30,
    fontWeight: '800',
  },
});

export function VictoryModal({}): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.victory}>You win!</Text>
    </View>
  );
}
