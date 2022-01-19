import React from 'react';
import {View, StyleSheet} from 'react-native';
import _ from 'lodash';
import {NUM_GUESSES} from '../constants';
import {WordGuess} from './WordGuess';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
interface GridProps {
  answer: string;
  guesses: string[];
  guessCandidate: string;
}

export function Grid({
  answer,
  guesses,
  guessCandidate,
}: GridProps): JSX.Element {
  return (
    <View style={styles.container}>
      {_.times(NUM_GUESSES, i => {
        let guess = guesses[i];
        let confirmedGuess = true;

        if (guess === undefined && i === guesses.length) {
          guess = guessCandidate;
          confirmedGuess = false;
        }

        return (
          <WordGuess
            key={i}
            answer={answer}
            guess={guess}
            confirmedGuess={confirmedGuess}
          />
        );
      })}
    </View>
  );
}
