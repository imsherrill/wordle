import React from 'react';
import {View, StyleSheet} from 'react-native';
import {EMPTY_LETTER_GUESS_RESULT, NUM_LETTERS} from '../constants';
import {LetterGuess} from './LetterGuess';
import _ from 'lodash';
import {WordGuessResult} from './Game';
import {GuessResult} from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

interface WordGuessProps {
  guessResult: WordGuessResult;
}

export function WordGuess({guessResult}: WordGuessProps): JSX.Element {
  const fullyCorrectGuess =
    guessResult &&
    _.every(guessResult, lgr => lgr.result === GuessResult.CORRECT);

  return (
    <View style={styles.container}>
      {_.times(NUM_LETTERS, i => {
        const letterGuessResult = guessResult
          ? guessResult[i]
          : EMPTY_LETTER_GUESS_RESULT;

        return (
          <LetterGuess
            key={i}
            guess={letterGuessResult.letter}
            result={letterGuessResult.result}
            letterIndex={i}
            allLettersCorrect={fullyCorrectGuess}
          />
        );
      })}
    </View>
  );
}
