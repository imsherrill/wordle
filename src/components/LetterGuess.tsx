import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    height: 40,
    width: 40,
    margin: 10,
  },
  textStyle: {
    color: '#BBBBBB',
    fontWeight: '800',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 7,
  },
});

interface LetterGuessProps {
  guess?: string;
  answer: string;
}

export function LetterGuess({guess}: LetterGuessProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{guess}</Text>
    </View>
  );
}
