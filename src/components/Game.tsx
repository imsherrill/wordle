import React, {useState, useCallback} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Grid} from './Grid';
import {Guesser} from './Guesser';
import randomWords from 'random-words';
import {NUM_LETTERS} from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 20,
  },
  guesserContainer: {
    marginTop: 50,
  },
});

function generateWord(): string {
  let word = '';
  while (word.length !== NUM_LETTERS) {
    word = randomWords({exactly: 1, maxLength: NUM_LETTERS})[0];
  }
  return word;
}

export function Game() {
  const [answer, setAnswer] = useState<string>(generateWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  console.log(answer);

  const makeGuess = useCallback(
    word => {
      const sanitizedWord = word.toLowerCase();
      setGuesses([...guesses, sanitizedWord]);
    },
    [guesses],
  );

  const resetGame = useCallback(() => {
    setGuesses([]);
    setAnswer(generateWord());
  }, []);

  return (
    <View style={styles.container}>
      <Grid answer={answer} guesses={guesses} />
      <View style={styles.guesserContainer}>
        <Guesser makeGuess={makeGuess} />
        <Button onPress={resetGame} title="Reset Game" />
      </View>
    </View>
  );
}
