import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderColor: colors.unknownBorder,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 40,
    textAlign: 'center',
    color: colors.peri,
    fontWeight: 'bold',
  },
  logoContainer: {},
  menuIconContainer: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    transform: [{translateY: 7}],
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
