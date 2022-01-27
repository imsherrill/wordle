import _ from 'lodash';
import words from './words.json';

export function isValidWord(word: string): boolean {
  return _.includes(words, word.toLowerCase());
}

export enum GuessResult {
  CORRECT,
  IN_WORD,
  INCORRECT,
  NO_GUESS,
}

// todo: unused?
export function getGuessResult(
  answer: string,
  letterGuess: string | undefined,
  index: number,
): GuessResult {
  if (_.isNil(letterGuess)) {
    return GuessResult.NO_GUESS;
  } else if (answer[index] === letterGuess) {
    return GuessResult.CORRECT;
  } else if (_.includes(answer, letterGuess)) {
    return GuessResult.IN_WORD;
  } else {
    return GuessResult.INCORRECT;
  }
}

export function generateLetterMap(): AlphabetMap {
  return {
    a: LetterTracker.NO_GUESS,
    b: LetterTracker.NO_GUESS,
    c: LetterTracker.NO_GUESS,
    d: LetterTracker.NO_GUESS,
    e: LetterTracker.NO_GUESS,
    f: LetterTracker.NO_GUESS,
    g: LetterTracker.NO_GUESS,
    h: LetterTracker.NO_GUESS,
    i: LetterTracker.NO_GUESS,
    j: LetterTracker.NO_GUESS,
    k: LetterTracker.NO_GUESS,
    l: LetterTracker.NO_GUESS,
    m: LetterTracker.NO_GUESS,
    n: LetterTracker.NO_GUESS,
    o: LetterTracker.NO_GUESS,
    p: LetterTracker.NO_GUESS,
    q: LetterTracker.NO_GUESS,
    r: LetterTracker.NO_GUESS,
    s: LetterTracker.NO_GUESS,
    t: LetterTracker.NO_GUESS,
    u: LetterTracker.NO_GUESS,
    v: LetterTracker.NO_GUESS,
    w: LetterTracker.NO_GUESS,
    x: LetterTracker.NO_GUESS,
    y: LetterTracker.NO_GUESS,
    z: LetterTracker.NO_GUESS,
    ent: LetterTracker.NO_GUESS,
    del: LetterTracker.NO_GUESS,
  };
}

export interface AlphabetMap {
  a: LetterTracker;
  b: LetterTracker;
  c: LetterTracker;
  d: LetterTracker;
  e: LetterTracker;
  f: LetterTracker;
  g: LetterTracker;
  h: LetterTracker;
  i: LetterTracker;
  j: LetterTracker;
  k: LetterTracker;
  l: LetterTracker;
  m: LetterTracker;
  n: LetterTracker;
  o: LetterTracker;
  p: LetterTracker;
  q: LetterTracker;
  r: LetterTracker;
  s: LetterTracker;
  t: LetterTracker;
  u: LetterTracker;
  v: LetterTracker;
  w: LetterTracker;
  x: LetterTracker;
  y: LetterTracker;
  z: LetterTracker;
  ent: LetterTracker;
  del: LetterTracker;
}

export enum LetterTracker {
  NO_GUESS,
  IN_WORD,
  KNOWN_INDEX,
  NOT_IN_WORD,
}

export function letterOccurrenceInWord(word: string, letter: string) {
  return (word.match(new RegExp(letter, 'g')) || []).length;
}

export function firstOccurrenceOfLetterInWord(
  answer: string,
  letter: string,
  index: number,
): boolean {
  var indicesOfLetter = [];
  for (var i = 0; i < answer.length; i++) {
    if (answer[i] === letter) {
      indicesOfLetter.push(i);
    }
  }

  console.log({indicesOfLetter, index, answer, letter});

  return index >= indicesOfLetter[0];
}
