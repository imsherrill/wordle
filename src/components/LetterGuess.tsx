import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../constants';
import {GuessResult} from '../utils';
import {RFPercentage} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    margin: 3,
    borderRadius: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: Math.min(RFPercentage(4), 46),
    textAlign: 'center',
  },
  correctGuess: {
    backgroundColor: colors.success,
  },
  incorrectGuess: {
    backgroundColor: colors.absent,
  },
  inWordGuess: {
    backgroundColor: colors.partial,
  },
  noGuess: {
    backgroundColor: colors.unknown,
    borderColor: colors.unknownBorder,
    borderWidth: 2,
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

export function LetterGuess({guess, result}: LetterGuessProps): JSX.Element {
  return (
    <View style={[styles.container, getGuessStyles(result)]}>
      <Text style={styles.textStyle}>{guess?.toUpperCase()}</Text>
    </View>
  );
}
