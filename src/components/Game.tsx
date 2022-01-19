import React, {useState, useCallback, useEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Grid} from './Grid';
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
import {Keyboard} from './Keyboard';
import {ValidationDisplay} from './ValidationDisplay';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  gridContainer: {
    marginHorizontal: 20,
    flex: 3,
  },
  keyboardContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  resetContainer: {},
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
  const [guessCandidate, setGuessCandidate] = useState('');
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined,
  );
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

  const makeGuess = useCallback(() => {
    if (guessCandidate.length !== NUM_LETTERS) {
      setValidationError('5 letter guesses only!');
    } else if (!isValidWord(guessCandidate)) {
      setValidationError('thats not an english word');
    } else {
      const sanitizedWord = guessCandidate.toLowerCase();
      setGuesses([...guesses, sanitizedWord]);
      updateTracker(sanitizedWord);
      setGuessCandidate('');
      setValidationError(undefined);
    }
  }, [guessCandidate, guesses, updateTracker]);

  const addToGuess = useCallback(
    letter => {
      if (guessCandidate.length < NUM_LETTERS) {
        setGuessCandidate(guessCandidate + letter);
      }
    },
    [guessCandidate],
  );

  const backspace = useCallback(() => {
    if (guessCandidate.length > 0) {
      setGuessCandidate(guessCandidate.substring(0, guessCandidate.length - 1));
    }
  }, [guessCandidate]);

  const resetGame = useCallback(() => {
    setGuesses([]);
    setGuessCandidate('');
    setValidationError(undefined);
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
      <View style={styles.gridContainer}>
        <Grid
          answer={answer}
          guesses={guesses}
          guessCandidate={guessCandidate}
        />
      </View>

      <ValidationDisplay text={validationError} />
      <View style={styles.keyboardContainer}>
        <Keyboard
          alphabetTracker={alphabetTracker}
          submit={makeGuess}
          backspace={backspace}
          onType={addToGuess}
        />
      </View>
      <View style={styles.resetContainer}>
        <Button onPress={resetGame} title="Reset Game" />
      </View>
    </View>
  );
}
