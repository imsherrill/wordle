import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const modalStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.unknown,
    borderRadius: 10,
    position: 'relative',
    marginHorizontal: 30,
  },
  innerContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  baseButton: {
    borderRadius: 4,
    marginHorizontal: 5,
  },
  baseButtonText: {
    fontSize: 17,
    padding: 10,
    color: colors.absent,
  },
  shareButton: {
    backgroundColor: colors.partial,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingRight: 10,
  },
});
