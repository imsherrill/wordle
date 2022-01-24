import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import {LetterTracker} from '../utils';
import {onKeyboardButtonPress} from './Keyboard';

const styles = StyleSheet.create({
  textStyle: {
    color: colors.text,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  baseKeyboardKey: {
    paddingHorizontal: 10,
    marginHorizontal: 1.5,
    minWidth: 32,
    borderRadius: 3,
    justifyContent: 'center',
  },
  knownIndex: {
    backgroundColor: colors.success,
  },
  inWord: {
    backgroundColor: colors.partial,
  },
  noGuess: {
    backgroundColor: colors.noGuessKeyboard,
  },
  notInWord: {
    backgroundColor: colors.background,
  },
});

export function KeyboardKey({
  letter,
  state,
  onPress,
}: {
  letter: string;
  state: LetterTracker;
  onPress: onKeyboardButtonPress;
}) {
  return (
    <TouchableOpacity style={getStateStyles(state)} onPress={onPress}>
      <Text style={styles.textStyle}>{letter.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

function getStateStyles(state: LetterTracker): any {
  switch (+state) {
    case LetterTracker.NO_GUESS:
      return [styles.noGuess, styles.baseKeyboardKey];
    case LetterTracker.IN_WORD:
      return [styles.inWord, styles.baseKeyboardKey];
    case LetterTracker.KNOWN_INDEX:
      return [styles.knownIndex, styles.baseKeyboardKey];
    case LetterTracker.NOT_IN_WORD:
      return [styles.notInWord, styles.baseKeyboardKey];
  }
}
