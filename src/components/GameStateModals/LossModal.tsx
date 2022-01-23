import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constants';
import {gameResetter} from '../../GameResetter';
import {modalStyles} from './sharedStyles';

const styles = StyleSheet.create({
  lossText: {
    color: colors.failure,
    fontSize: 30,
    fontWeight: '800',
  },
  answer: {
    color: colors.text,
    marginTop: 10,
    textTransform: 'uppercase',
  },
  newGameButton: {
    backgroundColor: colors.partial,
  },
});

interface LossModalProps {
  answer: string;
}

export function LossModal({answer}: LossModalProps): JSX.Element {
  const resetGame = useCallback(() => {
    gameResetter.call();
  }, []);

  return (
    <View style={modalStyles.container}>
      <View style={modalStyles.innerContainer}>
        <Text style={styles.lossText}>You lose!</Text>
        <Text style={styles.answer}>{answer}</Text>
        <View style={modalStyles.buttonRow}>
          <TouchableOpacity
            style={[styles.newGameButton, modalStyles.baseButton]}
            onPress={resetGame}>
            <Text style={modalStyles.baseButtonText}>New Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
