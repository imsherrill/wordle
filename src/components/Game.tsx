import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Grid} from './Grid';
import randomWords from 'random-words';
import {NUM_GUESSES, NUM_LETTERS} from '../constants';
import _ from 'lodash';
import {
  AlphabetMap,
  generateLetterMap,
  isValidWord,
  LetterTracker,
} from '../utils';
import {Keyboard} from './Keyboard';
import {gameResetter} from '../GameResetter';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';
import {VictoryModal} from './GameStateModals/VictoryModal';
import {LossModal} from './GameStateModals/LossModal';
import {useShareGameResultCallback} from '../hooks/useShareGameResultCallback';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 5,
  },
  gridContainer: {
    marginHorizontal: 30,
    flex: 3,
    justifyContent: 'center',
    maxWidth: 500,
    alignSelf: 'center',
  },
  keyboardContainer: {
    flex: 1,
    maxHeight: 200,
  },
  modalStyle: {
    margin: 0,
  },
});

export enum GameState {
  VICTORY,
  IN_PROGRESS,
  LOSS,
}

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
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.IN_PROGRESS);
  const [alphabetTracker, setAlphabetTracker] = useState<AlphabetMap>(
    generateLetterMap(),
  );

  const shareScore = useShareGameResultCallback(answer, guesses);

  const navigation = useNavigation();

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

  // todo: dont let user hit enter if theres no candidate
  const makeGuess = useCallback(() => {
    if (guessCandidate.length !== NUM_LETTERS) {
      Toast.show({
        type: 'error',
        text1: `${NUM_LETTERS} letter guesses only!`,
      });
    } else if (!isValidWord(guessCandidate)) {
      Toast.show({
        type: 'error',
        text1: 'Thats not a real word',
      });
    } else {
      const sanitizedWord = guessCandidate.toLowerCase();
      setGuesses([...guesses, sanitizedWord]);
      updateTracker(sanitizedWord);
      setGuessCandidate('');
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
    setAnswer(generateWord());
    setAlphabetTracker(generateLetterMap());
    navigation.closeDrawer();
  }, [navigation]);

  useEffect(() => {
    gameResetter.register(resetGame);
  }, [resetGame]);

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
      <View style={styles.gridContainer}>
        <Grid
          answer={answer}
          guesses={guesses}
          guessCandidate={guessCandidate}
        />
      </View>
      <View style={styles.keyboardContainer}>
        <Keyboard
          alphabetTracker={alphabetTracker}
          submit={makeGuess}
          backspace={backspace}
          onType={addToGuess}
        />
      </View>
      <Modal
        isVisible={gameState === GameState.VICTORY}
        swipeDirection="down"
        onSwipeComplete={resetGame}
        onBackdropPress={resetGame}
        style={styles.modalStyle}>
        <VictoryModal shareScore={shareScore} />
      </Modal>
      <Modal
        isVisible={gameState === GameState.LOSS}
        swipeDirection="down"
        onSwipeComplete={resetGame}
        onBackdropPress={resetGame}
        style={styles.modalStyle}>
        <LossModal answer={answer} shareScore={shareScore} />
      </Modal>
    </View>
  );
}
