import _ from 'lodash';
import {useCallback} from 'react';
import {Share} from 'react-native';
import {WordGuessResult} from '../components/Game';
import {NUM_GUESSES} from '../constants';
import {GuessResult} from '../utils';

export function useShareGameResultCallback(guessResults: WordGuessResult[]) {
  const shareCallback = useCallback(() => {
    const shareText = buildShareText(guessResults);
    Share.share({
      message: shareText,
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  }, [guessResults]);

  return shareCallback;
}

function buildShareText(guessResults: WordGuessResult[]): string {
  const overviewText = `Very Peri Wordle ${guessResults.length}/${NUM_GUESSES}`;
  const emojiGameBoard = _.map(guessResults, guessResult => {
    return buildEmojiGuessRow(guessResult);
  }).join('\n');

  return `${overviewText}\n\n${emojiGameBoard}`;
}

function buildEmojiGuessRow(guess?: WordGuessResult): string {
  if (guess === undefined) {
    return '';
  }

  return _.map(guess, letterResult => {
    switch (+letterResult.result) {
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
