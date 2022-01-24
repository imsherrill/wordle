import _ from 'lodash';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AlphabetMap} from '../utils';
import {KeyboardKey} from './KeyboardKey';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2,
    flex: 1,
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

export type onKeyboardButtonPress = (arg0: any) => void;

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
              let wideKey = false;
              if (keyboardKey === 'ent') {
                wideKey = true;
                onPress = submit;
              } else if (keyboardKey === 'del') {
                wideKey = true;
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
                  wide={wideKey}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
