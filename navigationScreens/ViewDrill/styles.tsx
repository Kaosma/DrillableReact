import { StyleSheet } from 'react-native';
import { windowWidth } from '../../Dimensions';

export const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#3a3535',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  viewDrillContainer: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#f4f4f4',
    borderRadius: 6,
    width: '95%',
    marginTop: 10,
  },
  drillInfoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  titleText: {
    color: '#f4f4f4',
    fontSize: 25,
    flexWrap: 'wrap',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  ratingText: {
    color: '#f4f4f4',
    fontSize: 20,
  },
  ratingStar: {
    color: '#fc5c14',
    fontSize: 20,
    paddingRight: 15,
  },
  opacityText: {
    fontSize: 20,
    opacity: 0,
  },
  detailedInfoContainer: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  categories: {
    alignItems: 'flex-start',
  },
  containerInfo: {
    alignItems: 'flex-start',
  },
  separatorContainer: {
    paddingRight: 10,
  },
  categoriesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomInfoContainer: {
    width: '100%',
  },
  categoriesText: {
    color: '#f4f4f4',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  separatorText: {
    color: '#f4f4f4',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  categoriesInfoText: {
    color: '#ff7315',
    fontSize: 20,
    textAlign: 'center',
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  equipmentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  equipmentInfoText: {
    color: '#f4f4f4',
    fontSize: 23,
    paddingLeft: 15,
    paddingTop: 20,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
  drillImage: {
    width: windowWidth * 0.95 - 30,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconOverlay: {
    width: 100,
    height: 100,
    tintColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
