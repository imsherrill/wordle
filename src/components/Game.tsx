import React, {useState, useCallback, useEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Grid} from './Grid';
import {Guesser} from './Guesser';
import randomWords from 'random-words';
import {NUM_GUESSES, NUM_LETTERS} from '../constants';
import _ from 'lodash';
import {GameState, GameStateBanner} from './GameStateBanner';
import {
  AlphabetMap,
  generateLetterMap,
  isValidWord,
  LetterTracker,
} from '../utils';
import {RemainingLetters} from './RemainingLetters';
import {Keyboard} from './Keyboard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 20,
  },
  guesserContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  remainingLettersContainer: {
    flex: 1,
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
  const [alphabetTracker, setAlphabetTracker] = useState<AlphabetMap>(
    generateLetterMap(),
  );

  const updateTracker = useCallback(
    guess => {
      for (var i = 0; i < guess.length; i++) {
        const letter: keyof AlphabetMap = guess.charAt(i);

        if (alphabetTracker[letter] === LetterTracker.KNOWN_INDEX) {
          continue;
        }

        if (answer[i] === letter) {
          alphabetTracker[letter] = LetterTracker.KNOWN_INDEX;
        } else if (_.includes(answer, letter)) {
          alphabetTracker[letter] = LetterTracker.IN_WORD;
        } else {
          alphabetTracker[letter] = LetterTracker.NOT_IN_WORD;
        }
      }
      setAlphabetTracker(alphabetTracker);
    },
    [alphabetTracker, answer],
  );

  const makeGuess = useCallback(
    word => {
      const sanitizedWord = word.toLowerCase();
      setGuesses([...guesses, sanitizedWord]);
      updateTracker(sanitizedWord);
    },
    [guesses, updateTracker],
  );

  const resetGame = useCallback(() => {
    setGuesses([]);
    setAnswer(generateWord());
    setAlphabetTracker(generateLetterMap());
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
      <GameStateBanner state={gameState} answer={answer} />
      <Grid answer={answer} guesses={guesses} />
      <View style={styles.guesserContainer}>
        <Guesser makeGuess={makeGuess} />
      </View>
      <View style={styles.remainingLettersContainer}>
        <Keyboard alphabetTracker={alphabetTracker} />
      </View>
      <Button onPress={resetGame} title="Reset Game" />
    </View>
  );
}
