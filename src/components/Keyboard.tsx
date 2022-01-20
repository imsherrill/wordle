import _ from 'lodash';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import {AlphabetMap, LetterTracker} from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  textStyle: {
    color: colors.text,
    fontWeight: '800',
    width: '100%',
    textAlign: 'center',
  },
  baseKeyboardKey: {
    paddingHorizontal: 10,
    marginHorizontal: 1.5,
    minWidth: 32,
    paddingVertical: 13,
    borderRadius: 3,
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

const KEYBOARD_LAYOUT = [
  'q w e r t y u i o p',
  'a s d f g h j k l',
  'ent z x c v b n m del',
];

interface KeyboardProps {
  alphabetTracker: AlphabetMap;
  submit: onKeyboardButtonPress;
  backspace: onKeyboardButtonPress;
  onType: onKeyboardButtonPress;
}

type onKeyboardButtonPress = (arg0: any) => void;

export function Keyboard({
  alphabetTracker,
  submit,
  backspace,
  onType,
}: KeyboardProps): JSX.Element {
  return (
    <View style={styles.container}>
      {_.map(KEYBOARD_LAYOUT, keyboardRow => {
        return (
          <View style={styles.keyboardRow} key={keyboardRow}>
            {_.map(keyboardRow.split(' '), keyboardKey => {
              let onPress: onKeyboardButtonPress;
              if (keyboardKey === 'ent') {
                onPress = submit;
              } else if (keyboardKey === 'del') {
                onPress = backspace;
              } else {
                onPress = () => onType(keyboardKey);
              }
              return (
                <KeyboardKey
                  letter={keyboardKey}
                  key={keyboardKey}
                  state={alphabetTracker[keyboardKey]}
                  onPress={onPress}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

function KeyboardKey({
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
