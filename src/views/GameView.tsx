import React from 'react';

import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Game} from '../components/Game';
import {colors} from '../constants/colors';
import {GameHeader} from './GameHeader';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  headerContainer: {
    marginTop: 5,
  },
});

export function GameView(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.headerContainer}>
        <GameHeader />
      </View>
      <Game />
    </SafeAreaView>
  );
}
