import React, {useState, useCallback} from 'react';
import {StyleSheet, View, TextInput, Button, Text} from 'react-native';
import {NUM_LETTERS} from '../constants';
import _ from 'lodash';
import {isValidWord} from '../utils';

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: 'lightgrey',
    flex: 1,
    height: 20,
  },
  validationError: {
    color: 'red',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface GuesserProps {
  makeGuess: (word: string) => void;
}

export function Guesser({makeGuess}: GuesserProps): JSX.Element {
  const [guessCandidate, setGuessCandidate] = useState('');
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined,
  );

  const onSubmit = useCallback(() => {
    if (guessCandidate.length !== NUM_LETTERS) {
      setValidationError('5 letter guesses only!');
    } else if (!isValidWord(guessCandidate)) {
      setValidationError('thats not an english word');
    } else {
      makeGuess(guessCandidate);
      setGuessCandidate('');
    }
  }, [guessCandidate, makeGuess]);

  const onChangeText = useCallback(word => {
    setGuessCandidate(word);
    setValidationError(undefined);
  }, []);

  const validationErrorSection: JSX.Element | null = !_.isNil(
    validationError,
  ) ? (
    <Text style={styles.validationError}>{validationError}</Text>
  ) : null;

  return (
    <View style={styles.container}>
      {validationErrorSection}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={guessCandidate}
          onChangeText={onChangeText}
        />
        <Button onPress={onSubmit} title="->" />
      </View>
    </View>
  );
}
