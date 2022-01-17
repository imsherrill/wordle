import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import {Game} from './src/components/Game';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    marginBottom: 250,
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView style={styles.keyboardView}>
        <View style={styles.innerView}>
          <Game />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
