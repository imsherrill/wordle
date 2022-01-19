import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {GameView} from './views/GameView';
import {GameDrawer} from './views/GameDrawer';

export function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <GameView />
    </NavigationContainer>
  );
}
