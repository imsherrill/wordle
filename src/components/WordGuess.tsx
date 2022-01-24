import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NUM_LETTERS} from '../constants';
import {LetterGuess} from './LetterGuess';
import _ from 'lodash';
import {getGuessResult, GuessResult} from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

interface WordGuessProps {
  answer: string;
  guess: string;
  confirmedGuess: boolean;
}

export function WordGuess({
  guess,
  answer,
  confirmedGuess,
}: WordGuessProps): JSX.Element {
  return (
    <View style={styles.container}>
      {_.times(NUM_LETTERS, i => {
        const letterGuess = guess ? guess[i] : undefined;
        let guessResult = GuessResult.NO_GUESS;
        if (confirmedGuess) {
          guessResult = getGuessResult(answer, letterGuess, i);
        }

        return <LetterGuess key={i} guess={letterGuess} result={guessResult} />;
      })}
    </View>
  );
}
