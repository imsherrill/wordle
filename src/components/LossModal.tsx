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
  loss: {
    color: 'red',
    fontSize: 30,
    fontWeight: '800',
  },
  answer: {
    color: colors.text,
  },
});

export function LossModal({answer}: {answer: string}): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.loss}>You lose!</Text>
        <Text style={styles.answer}>{answer}</Text>
      </View>
    </View>
  );
}
