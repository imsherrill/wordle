import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {colors} from '../constants';

const styles = StyleSheet.create({
  text: {
    color: colors.failure,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export function ValidationDisplay({
  text,
}: {
  text: string | undefined;
}): JSX.Element | null {
  if (text === undefined) {
    return null;
  }

  return <Text style={styles.text}>{text}</Text>;
}
