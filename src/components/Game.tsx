import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Grid} from './Grid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 20,
  },
});

export function Game() {
  const [answer] = useState('beast');
  const [guesses] = useState(['baces', 'mania', 'happy', undefined, undefined]);
  return (
    <View style={styles.container}>
      <Grid answer={answer} guesses={guesses} />
    </View>
  );
}
