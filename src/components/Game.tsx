import React, {useState, useCallback, useEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Grid} from './Grid';
import {Guesser} from './Guesser';
import randomWords from 'random-words';
import {NUM_GUESSES, NUM_LETTERS} from '../constants';
import _ from 'lodash';
import {GameState, GameStateBanner} from './GameStateBanner';
import {isValidWord} from '../utils';

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
  while (word.length !== NUM_LETTERS || !isValidWord(word)) {
    word = randomWords({exactly: 1, maxLength: NUM_LETTERS})[0];
  }
  return word;
}

export function Game() {
  const [answer, setAnswer] = useState<string>(generateWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.IN_PROGRESS);

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

  useEffect(() => {
    const lastGuess = _.last(guesses);
    if (lastGuess === answer) {
      setGameState(GameState.VICTORY);
    } else if (_.size(guesses) >= NUM_GUESSES) {
      setGameState(GameState.LOSS);
    } else {
      setGameState(GameState.IN_PROGRESS);
    }
  }, [guesses, answer]);

  return (
    <View style={styles.container}>
      <GameStateBanner state={gameState} />
      <Grid answer={answer} guesses={guesses} />
      <View style={styles.guesserContainer}>
        <Guesser makeGuess={makeGuess} />
        <Button onPress={resetGame} title="Reset Game" />
      </View>
    </View>
  );
}
