import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {gameResetter} from '../../GameResetter';
import {modalStyles} from './sharedStyles';
import Icon from 'react-native-vector-icons/Entypo';
import {colors} from '../../constants/colors';

const styles = StyleSheet.create({
  lossText: {
    color: colors.failureLight,
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
  shareScore: () => void;
}

export function LossModal({shareScore, answer}: LossModalProps): JSX.Element {
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
          <TouchableOpacity
            onPress={shareScore}
            style={[modalStyles.shareButton, modalStyles.baseButton]}>
            <Text style={modalStyles.baseButtonText}>Share</Text>
            <Icon name="share" size={21} color={colors.absent} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
