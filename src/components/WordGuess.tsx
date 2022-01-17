import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NUM_LETTERS} from '../constants';
import {GuessResult, LetterGuess} from './LetterGuess';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface WordGuessProps {
  answer: string;
  guess: string[];
}

function getGuessResult(
  answer: string,
  letterGuess: string | undefined,
  index: number,
): GuessResult {
  if (_.isNil(letterGuess)) {
    return GuessResult.NO_GUESS;
  } else if (answer[index] === letterGuess) {
    return GuessResult.CORRECT;
  } else if (_.includes(answer, letterGuess)) {
    return GuessResult.IN_WORD;
  } else {
    return GuessResult.INCORRECT;
  }
}

export function WordGuess({guess, answer}: WordGuessProps): JSX.Element {
  return (
    <View style={styles.container}>
      {_.times(NUM_LETTERS, i => {
        const letterGuess = guess ? guess[i] : undefined;
        return (
          <LetterGuess
            key={i}
            guess={letterGuess}
            result={getGuessResult(answer, letterGuess, i)}
          />
        );
      })}
    </View>
  );
}
