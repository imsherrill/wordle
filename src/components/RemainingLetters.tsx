import _ from 'lodash';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../constants';
import {AlphabetMap, LetterTracker} from '../utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  letterContainer: {
    height: 50,
    width: 50,
  },
  baseGuess: {
    margin: 10,
    color: colors.text,
    fontWeight: '800',
  },
  knownIndex: {
    backgroundColor: colors.success,
  },
  inWord: {
    backgroundColor: colors.partial,
  },
  noGuess: {
    backgroundColor: colors.unknown,
  },
  notInWord: {
    backgroundColor: colors.background,
  },
});

interface RemainingLettersProps {
  alphabetTracker: AlphabetMap;
}

export function RemainingLetters({
  alphabetTracker,
}: RemainingLettersProps): JSX.Element {
  console.log(alphabetTracker);
  return (
    <View style={styles.container}>
      {_.map(alphabetTracker, (state, letter) => {
        return <Letter letter={letter} state={state} />;
      })}
    </View>
  );
}

function Letter({letter, state}: {letter: string; state: LetterTracker}) {
  return (
    <View style={styles.letterContainer}>
      <Text style={getStateStyles(state)}>{letter.toUpperCase()}</Text>
    </View>
  );
}

function getStateStyles(state: LetterTracker): any {
  switch (+state) {
    case LetterTracker.NO_GUESS:
      return [styles.noGuess, styles.baseGuess];
    case LetterTracker.IN_WORD:
      return [styles.inWord, styles.baseGuess];
    case LetterTracker.KNOWN_INDEX:
      return [styles.knownIndex, styles.baseGuess];
    case LetterTracker.NOT_IN_WORD:
      return [styles.notInWord, styles.baseGuess];
  }
}
