import React from 'react';
import {View, StyleSheet} from 'react-native';
import _ from 'lodash';
import {NUM_GUESSES, NUM_LETTERS} from '../constants';
import {WordGuess} from './WordGuess';
import {WordGuessResult} from './Game';
import {GuessResult} from '../utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
});
interface GridProps {
  guessCandidate: string;
  guessResults: WordGuessResult[];
}

export function Grid({guessCandidate, guessResults}: GridProps): JSX.Element {
  return (
    <View style={styles.container}>
      {_.times(NUM_GUESSES, i => {
        let guessResult = guessResults[i];

        if (guessResult === undefined && i === guessResults.length) {
          guessResult = resultsFromCandidate(guessCandidate);
        }

        return <WordGuess key={i} guessResult={guessResult} />;
      })}
    </View>
  );
}

function resultsFromCandidate(guessCandidate: string): WordGuessResult {
  return _.times(NUM_LETTERS, idx => ({
    letter: guessCandidate[idx] ?? '',
    result: GuessResult.NO_GUESS,
  }));
}
