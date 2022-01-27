import {LetterGuessResult} from '../components/Game';
import {GuessResult} from '../utils';

export const NUM_LETTERS = 5;
export const NUM_GUESSES = 6;
export const LETTER_FLIP_ANIMATION_DURATION = 700;
export const VICTORY_ANIMATION_DURATION = 200;

export const EMPTY_LETTER_GUESS_RESULT: LetterGuessResult = {
  letter: '',
  result: GuessResult.NO_GUESS,
};
