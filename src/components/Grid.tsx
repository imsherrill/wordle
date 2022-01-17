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
}

export function Grid({answer, guesses}: GridProps): JSX.Element {
  return (
    <View style={styles.container}>
      {_.times(NUM_GUESSES, i => {
        const guess = guesses[i];
        return <WordGuess key={i} answer={answer} guess={guess} />;
      })}
    </View>
  );
}
