import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#3a3535',
    alignItems: 'center',
  },
  practiceInfoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  practiceInfo: {
    color: '#f4f4f4',
    fontSize: 25,
    marginTop: 25,
  },
  playerSlider: {
    width: 250,
    height: 40,
  },
  equipmentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  doneButton: {
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: 20,
    shadowColor: 'black',
    shadowRadius: 3,
    height: 70,
    width: '80%',
  },
  doneButtonText: {
    color: '#f4f4f4',
    fontFamily: 'System',
    fontSize: 20,
  },
});
