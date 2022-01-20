import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {colors} from '../constants';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  logo: {
    fontSize: 40,
    textAlign: 'center',
    color: colors.peri,
    fontWeight: 'bold',
  },
  logoContainer: {
    flexDirection: 'column',
  },
  menuIconContainer: {
    alignSelf: 'flex-end',
    paddingRight: 20,
    transform: [{translateY: -41}],
  },
});

export function GameHeader(): JSX.Element {
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Wordle</Text>
      </View>
      <TouchableOpacity style={styles.menuIconContainer} onPress={openDrawer}>
        <Icon name="menu" size={40} color={colors.peri} />
      </TouchableOpacity>
    </View>
  );
}
