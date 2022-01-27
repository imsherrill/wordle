import React, {useCallback, useState} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../constants/colors';
import {gameResetter} from '../GameResetter';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 6,
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
  modalStyle: {
    backgroundColor: colors.peri,
    alignItems: 'center',
    maxHeight: 200,
    maxWidth: 200,
  },
  textInputStyle: {},
});

export function GameDrawerShell(): JSX.Element {
  return <GameDrawer />;
}

export function GameDrawer(): JSX.Element {
  const resetGame = useCallback(() => {
    gameResetter.call();
  }, []);

  const [devModeCounter, setDevModeCounter] = useState<number>(0);
  const [resetWord, setResetWord] = useState<string>('');

  const incrementDevModeCounter = useCallback(() => {
    setDevModeCounter(counter => counter + 1);
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={resetGame}>
          <Text style={styles.itemText}>New Game</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={incrementDevModeCounter}>
          <Text style={styles.madeByIsaacText}>Made By Isaac :)</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal
        isVisible={devModeCounter >= 5}
        swipeDirection="down"
        onSwipeComplete={() => setDevModeCounter(0)}
        onBackdropPress={() => setDevModeCounter(0)}
        style={styles.modalStyle}>
        <Text>Dev Menu</Text>
        <TextInput
          onChangeText={setResetWord}
          placeholder="Override Answer"
          style={styles.textInputStyle}
        />
        <Button
          title="reset"
          color={colors.background}
          onPress={() => {
            setDevModeCounter(0);
            setResetWord('');
            gameResetter.call(resetWord.toLowerCase());
          }}
        />
      </Modal>
    </>
  );
}
