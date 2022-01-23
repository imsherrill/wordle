import _ from 'lodash';
import {useCallback} from 'react';
import {Share} from 'react-native';
import {NUM_GUESSES} from '../constants';
import {getGuessResult, GuessResult} from '../utils';

export function useShareGameResultCallback(answer: string, guesses: string[]) {
  const shareCallback = useCallback(() => {
    const shareText = buildShareText(answer, guesses);
    Share.share({
      message: shareText,
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  }, [answer, guesses]);

  return shareCallback;
}

function buildShareText(answer: string, guesses: string[]): string {
  const overviewText = `Wordle ${guesses.length}/${NUM_GUESSES}`;
  const emojiGameBoard = _.map(guesses, guess => {
    return buildEmojiGuessRow(answer, guess);
  }).join('\n');

  return `${overviewText}\n\n${emojiGameBoard}`;
}

function buildEmojiGuessRow(answer: string, guess: string | undefined): string {
  if (guess === undefined) {
    return '';
  }

  return _.map(guess.split(''), (letter, idx) => {
    const guessResult = getGuessResult(answer, letter, idx);

    switch (+guessResult) {
      case GuessResult.CORRECT:
        return '🟩';
      case GuessResult.IN_WORD:
        return '🟨';
      case GuessResult.INCORRECT:
        return '⬛️';
      case GuessResult.NO_GUESS:
        return '⬛️';
    }
  }).join('');
}
