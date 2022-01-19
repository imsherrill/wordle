import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GameView} from './views/GameView';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {GameDrawer} from './views/GameDrawer';

const Drawer = createDrawerNavigator();

export function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Game" component={GameView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
