import React, {useCallback} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../constants';
import {gameResetter} from '../GameResetter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 6,
  },
  itemContainer: {
    borderBottomColor: colors.peri,
  },
  itemText: {
    color: colors.partial,
    fontSize: 18,
    padding: 20,
    fontWeight: '500',
  },
  madeByIsaacText: {
    color: colors.peri,
    fontSize: 15,
    padding: 20,
    fontWeight: '800',
    textAlign: 'right',
  },
});

export function GameDrawerShell(): JSX.Element {
  return <GameDrawer />;
}

export function GameDrawer({}): JSX.Element {
  const resetGame = useCallback(() => {
    gameResetter.call();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.itemContainer} onPress={resetGame}>
        <Text style={styles.itemText}>Reset Game</Text>
      </TouchableOpacity>
      <Text style={styles.madeByIsaacText}>Made By Isaac :)</Text>
    </SafeAreaView>
  );
}
