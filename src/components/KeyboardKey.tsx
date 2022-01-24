import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import {LetterTracker} from '../utils';
import {onKeyboardButtonPress} from './Keyboard';
import {RFPercentage} from 'react-native-responsive-fontsize';

const KEY_WIDTH_PERCENT = 8.5;

const styles = StyleSheet.create({
  textStyle: {
    color: colors.text,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: RFPercentage(2.1),
  },
  baseKeyboardKey: {
    width: `${KEY_WIDTH_PERCENT}%`,
    marginHorizontal: 1.5,
    minWidth: 32,
    borderRadius: 3,
    justifyContent: 'center',
  },
  wideKey: {
    width: `${KEY_WIDTH_PERCENT * 1.5}%`,
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
  wide,
}: {
  letter: string;
  state: LetterTracker;
  onPress: onKeyboardButtonPress;
  wide: boolean;
}) {
  const wideStyle = wide ? styles.wideKey : null;

  return (
    <TouchableOpacity
      style={[getStateStyles(state), wideStyle]}
      onPress={onPress}>
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
