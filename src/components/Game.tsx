import React, {useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Grid} from './Grid';
import {Guesser} from './Guesser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 20,
  },
});

export function Game() {
  const [answer] = useState('beast');
  const [guesses, setGuesses] = useState(['bases', 'mania', 'happy']);
  console.log(guesses);

  const makeGuess = useCallback(
    word => {
      const sanitizedWord = word.toLowerCase();
      setGuesses([...guesses, sanitizedWord]);
    },
    [guesses],
  );

  return (
    <View style={styles.container}>
      <Grid answer={answer} guesses={guesses} />
      <Guesser makeGuess={makeGuess} />
    </View>
  );
}
