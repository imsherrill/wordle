import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {},
  victory: {
    color: 'green',
  },
  loss: {
    color: 'red',
  },
});

export enum GameState {
  VICTORY,
  IN_PROGRESS,
  LOSS,
}

interface GameStateBannerProps {
  state: GameState;
}

export function GameStateBanner({state}: GameStateBannerProps): JSX.Element {
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
        </View>
      );
  }
}
