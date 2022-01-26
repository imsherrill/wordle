import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants';
import {LetterTracker} from '../utils';
import {onKeyboardButtonPress} from './Keyboard';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {BaseButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';

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
    borderRadius: 3,
    justifyContent: 'center',
    zIndex: -1,
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
  baseActiveKeyboardKey: {
    zIndex: 20,
    position: 'absolute',
    top: '-120%',
    left: -10,
    right: -10,
    borderRadius: 3,
  },
  carrotContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '-100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseActiveKeyboardCarrot: {
    transform: [{scaleY: 2}],
  },
  activeKeyboardText: {
    padding: 15,
    fontSize: RFPercentage(3),
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
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      <BaseButton
        style={[getStateStyles(state, styles.baseKeyboardKey), wideStyle]}
        onActiveStateChange={setIsPressed}
        onPress={onPress}>
        <Text style={styles.textStyle}>{letter.toUpperCase()}</Text>
        {isPressed ? <ActiveKeyboardKey state={state} text={letter} /> : null}
      </BaseButton>
    </>
  );
}

function getStateStyles(state: LetterTracker, extraStyles: any): any {
  switch (+state) {
    case LetterTracker.NO_GUESS:
      return [styles.noGuess, extraStyles];
    case LetterTracker.IN_WORD:
      return [styles.inWord, extraStyles];
    case LetterTracker.KNOWN_INDEX:
      return [styles.knownIndex, extraStyles];
    case LetterTracker.NOT_IN_WORD:
      return [styles.notInWord, extraStyles];
  }
}

function ActiveKeyboardKey({
  text,
  state,
}: {
  text: string;
  state: LetterTracker;
}) {
  return (
    <View style={[getStateStyles(state, styles.baseActiveKeyboardKey)]}>
      <Text style={[styles.textStyle, styles.activeKeyboardText]}>
        {text.toUpperCase()}
      </Text>
      <View style={styles.carrotContainer}>
        <Icon
          name="triangle-down"
          size={21}
          color={getStateStyles(state, null)[0]?.backgroundColor}
          style={styles.baseActiveKeyboardCarrot}
        />
      </View>
    </View>
  );
}
