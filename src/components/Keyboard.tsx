import _ from 'lodash';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import {AlphabetMap, LetterTracker} from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  letterContainer: {},
  keyboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  baseGuess: {
    padding: 8,
    color: colors.text,
    fontWeight: '800',
    textAlign: 'center',
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

const KEYBOARD_LAYOUT = [
  'q w e r t y u i o p',
  'a s d f g h j k l',
  'ent z x c v b n m del',
];

interface KeyboardProps {
  alphabetTracker: AlphabetMap;
}

export function Keyboard({alphabetTracker}: KeyboardProps): JSX.Element {
  return (
    <View style={styles.container}>
      {_.map(KEYBOARD_LAYOUT, keyboardRow => {
        return (
          <View style={styles.keyboardRow} key={keyboardRow}>
            {_.map(keyboardRow.split(' '), keyboardKey => {
              return (
                <Letter
                  letter={keyboardKey}
                  key={keyboardKey}
                  state={alphabetTracker[keyboardKey]}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

function Letter({letter, state}: {letter: string; state: LetterTracker}) {
  return (
    <TouchableOpacity style={styles.letterContainer}>
      <Text style={getStateStyles(state)}>{letter.toUpperCase()}</Text>
    </TouchableOpacity>
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
