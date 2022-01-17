import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const BOX_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    height: BOX_SIZE,
    width: BOX_SIZE,
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
  correctGuess: {
    backgroundColor: 'green',
  },
  incorrectGuess: {
    backgroundColor: 'maroon',
  },
  inWordGuess: {
    backgroundColor: '#8f8636',
  },
  noGuess: {
    backgroundColor: 'navy',
  },
});

function getGuessStyles(result: GuessResult): any {
  switch (+result) {
    case GuessResult.CORRECT:
      return styles.correctGuess;
    case GuessResult.IN_WORD:
      return styles.inWordGuess;
    case GuessResult.INCORRECT:
      return styles.incorrectGuess;
    case GuessResult.NO_GUESS:
      return styles.noGuess;
  }
}

interface LetterGuessProps {
  guess?: string;
  result: GuessResult;
}

export enum GuessResult {
  CORRECT,
  IN_WORD,
  INCORRECT,
  NO_GUESS,
}

export function LetterGuess({guess, result}: LetterGuessProps): JSX.Element {
  return (
    <View style={[styles.container, getGuessStyles(result)]}>
      <Text style={styles.textStyle}>{guess?.toUpperCase()}</Text>
    </View>
  );
}
