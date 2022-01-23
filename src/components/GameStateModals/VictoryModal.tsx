import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constants';
import {gameResetter} from '../../GameResetter';
import {modalStyles} from './sharedStyles';

const styles = StyleSheet.create({
  victoryText: {
    color: colors.success,
    fontSize: 50,
    fontWeight: '800',
  },
  newGameButton: {
    backgroundColor: colors.partial,
  },

});

interface VictoryModalProps {
  shareScore: () => void;
}

export function VictoryModal({shareScore}: VictoryModalProps): JSX.Element {
  const resetGame = useCallback(() => {
    gameResetter.call();
  }, []);

  return (
    <View style={modalStyles.container}>
      <View style={modalStyles.innerContainer}>
        <Text style={styles.victoryText}>You win!</Text>
        <View style={modalStyles.buttonRow}>
          <TouchableOpacity
            style={[styles.newGameButton, modalStyles.baseButton]}
            onPress={resetGame}>
            <Text style={modalStyles.baseButtonText}>New Game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareScore}
            style={[modalStyles.shareButton, modalStyles.baseButton]}>
            <Text style={modalStyles.baseButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
