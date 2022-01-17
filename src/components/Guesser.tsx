import React, {useState, useCallback} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import {NUM_LETTERS} from '../constants';

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: 'lightgrey',
  },
});

interface GuesserProps {
  makeGuess: (word: string) => void;
}

export function Guesser({makeGuess}: GuesserProps): JSX.Element {
  const [guessCandidate, setGuessCandidate] = useState('');

  const onSubmit = useCallback(() => {
    if (guessCandidate.length === NUM_LETTERS) {
      makeGuess(guessCandidate);
      setGuessCandidate('');
    }
  }, [guessCandidate, makeGuess]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={guessCandidate}
        onChangeText={setGuessCandidate}
      />
      <Button onPress={onSubmit} title="Make Guess" />
    </View>
  );
}
