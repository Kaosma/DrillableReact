import { StyleSheet } from 'react-native';

// Styles for entire app
export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#3a3535',
    alignItems: 'center',
  },
  drillContainer: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#f4f4f4',
    borderRadius: 6,
    margin: 5,
  },
  viewDrillContainer: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#f4f4f4',
    borderRadius: 6,
    width: '95%',
    marginTop: 10,
  },
  drillContainerButton: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    marginRight: 20,
  },
});
