import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NUM_LETTERS} from '../constants';
import {LetterGuess} from './LetterGuess';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export function WordGuess(): JSX.Element {
  return (
    <View style={styles.container}>
      {_.times(NUM_LETTERS, i => {
        return <LetterGuess key={i} guess={'B'} />;
      })}
    </View>
  );
}
