import _ from 'lodash';
import words from './words.json';

export function isValidWord(word: string): boolean {
  const downcase = word.toLowerCase();
  console.log(_.includes(words, downcase));
  return _.includes(words, downcase);
}
