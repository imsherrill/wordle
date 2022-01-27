import React from 'react';

import {AppNavigator} from './src/AppNavigator';
import Toast, {BaseToast} from 'react-native-toast-message';
import {colors} from './src/constants/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  errorText1Style: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  errorContainerStyle: {
    backgroundColor: colors.errorAlert,
  },
});

const toastConfig = {
  error: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors.failure}}
      contentContainerStyle={styles.errorContainerStyle}
      text1Style={styles.errorText1Style}
    />
  ),
};

export default function App(): JSX.Element {
  return (
    <>
      <AppNavigator />
      <Toast
        position="bottom"
        config={toastConfig}
        bottomOffset={275}
        visibilityTime={2000}
      />
    </>
  );
}
