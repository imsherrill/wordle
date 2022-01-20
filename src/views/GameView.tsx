import React from 'react';

import {StatusBar, useColorScheme, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Game} from '../components/Game';
import {colors} from '../constants';
import {GameHeader} from './GameHeader';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  innerView: {
    flex: 1,
  },
});

export function GameView(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.innerView}>
        <GameHeader />
        <Game />
      </View>
    </SafeAreaView>
  );
}
