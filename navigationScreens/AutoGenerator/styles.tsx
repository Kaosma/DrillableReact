import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#3a3535',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  durationSlider: {
    width: 250,
    height: 40,
  },
  playerSlider: {
    width: 250,
    height: 40,
  },
  generatePracticeButton: {
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ff7315',
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: 'black',
    shadowRadius: 3,
    height: 70,
    width: '80%',
  },
  generatePracticeButtonText: {
    color: '#f4f4f4',
    fontFamily: 'System',
    fontSize: 20,
  },
  practiceInfoText: {
    color: '#f4f4f4',
    fontSize: 25,
    marginTop: 25,
  },
  categoryInfoText: {
    color: '#f4f4f4',
    fontSize: 25,
  },
  selectCategoryContainer: {
    height: '30%',
    width: '80%',
    alignItems: 'center',
  },
  categoryList: {
    paddingTop: 10,
  },
  categoryButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 50,
    paddingLeft: 40,
  },
  categoryButtonText: {
    padding: 5,
    color: '#f4f4f4',
    fontSize: 18,
  },
});
