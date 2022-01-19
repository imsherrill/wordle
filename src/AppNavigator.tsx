import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GameView} from './views/GameView';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Text, View} from 'react-native';

const Stack = createNativeStackNavigator();

export function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}): JSX.Element {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Go to Game" onPress={() => navigation.navigate('Game')} />
    </View>
  );
}
