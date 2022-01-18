import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  victory: {
    color: colors.success,
    fontSize: 30,
    fontWeight: '800',
  },
  loss: {
    color: 'red',
    fontSize: 30,
    fontWeight: '800',
  },
  answer: {
    color: colors.text,
  },
});

export enum GameState {
  VICTORY,
  IN_PROGRESS,
  LOSS,
}

interface GameStateBannerProps {
  state: GameState;
  answer: string;
}

export function GameStateBanner({
  state,
  answer,
}: GameStateBannerProps): JSX.Element {
  if (state === GameState.IN_PROGRESS) {
    return <View />;
  }
  switch (+state) {
    case GameState.VICTORY:
      return (
        <View style={styles.container}>
          <Text style={styles.victory}>You win!</Text>
        </View>
      );
    case GameState.LOSS:
      return (
        <View style={styles.container}>
          <Text style={styles.loss}>You lose!</Text>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      );
  }
}
