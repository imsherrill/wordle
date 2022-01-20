import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GameView} from './views/GameView';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {GameDrawerShell} from './views/GameDrawer';
import {colors} from './constants';

const Drawer = createDrawerNavigator();

export type RootStackParamsList = {
  GameView: undefined;
};

export function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={GameDrawerShell}
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
          drawerStyle: {
            width: 150,
            backgroundColor: colors.background,
          },
        }}>
        <Drawer.Screen name="Game" component={GameView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
