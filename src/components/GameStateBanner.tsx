import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  victory: {
    color: 'green',
    fontSize: 30,
    fontWeight: '800',
  },
  loss: {
    color: 'red',
    fontSize: 30,
    fontWeight: '800',
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
