import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../constants/colors';
import {GuessResult} from '../utils';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  LETTER_FLIP_ANIMATION_DURATION,
  VICTORY_ANIMATION_DURATION,
  VICTORY_ANIMATION_HEIGHT,
} from '../constants';

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
  letterIndex: number;
  allLettersCorrect: boolean;
}

export function LetterGuess({
  guess,
  result,
  letterIndex,
  allLettersCorrect,
}: LetterGuessProps): JSX.Element {
  const [shouldUseResultStyle, setShouldUseResultStyle] = useState(false);
  const rotateY = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateY: `${rotateY.value} deg`},
        {translateY: translateY.value},
      ],
    };
  });

  const runGuessAnimation = useCallback(() => {
    const duration = LETTER_FLIP_ANIMATION_DURATION / 2;
    rotateY.value = withTiming(90, {duration}, () => {
      rotateY.value = -90;
      runOnJS(setShouldUseResultStyle)(true);
      rotateY.value = withTiming(0, {duration}, () => {});
    });
  }, [rotateY]);

  const runVictoryAnimation = useCallback(() => {
    const duration = VICTORY_ANIMATION_DURATION;
    const animationHeight = -VICTORY_ANIMATION_HEIGHT;
    translateY.value = withTiming(animationHeight, {duration}, () => {
      runOnJS(setShouldUseResultStyle)(true);
      translateY.value = withTiming(0, {duration}, () => {});
    });
  }, [translateY]);

  useEffect(() => {
    if (allLettersCorrect) {
      const timer = setTimeout(runVictoryAnimation, letterIndex * 100);
      return () => clearTimeout(timer);
    } else if (result !== GuessResult.NO_GUESS) {
      const timer = setTimeout(runGuessAnimation, letterIndex * 50);
      return () => clearTimeout(timer);
    }
  }, [
    result,
    letterIndex,
    runGuessAnimation,
    allLettersCorrect,
    runVictoryAnimation,
  ]);

  return (
    <Animated.View
      style={[
        styles.container,
        shouldUseResultStyle ? getGuessStyles(result) : styles.noGuess,
        animatedStyles,
      ]}>
      <Text style={styles.textStyle}>{guess?.toUpperCase()}</Text>
    </Animated.View>
  );
}
