import { StyleSheet } from 'react-native';

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
  drillView: {
    flex: 4,
    flexDirection: 'row',
    marginTop: 10,
  },
  infoContainer: {
    flex: 3,
    marginLeft: 10,
  },
  titleContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    color: '#f4f4f4',
    fontSize: 22,
  },
  detailedInfoContainer: {
    flex: 3,
    flexDirection: 'row',
    marginTop: 10,
  },
  infoText: {
    flex: 1,
    color: '#f4f4f4',
    fontSize: 17,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drillImage: {
    width: 70,
    height: 70,
  },
  drillButtonContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  drillStandardButton: {
    color: '#ffffff',
    fontFamily: 'System',
    marginRight: 20,
  },
  drillStandardButtonText: {
    fontFamily: 'System',
    color: '#f4f4f4',
    fontSize: 20,
  },
  ratingContainer: {
    marginRight: 15,
    flexDirection: 'row',
  },
  ratingText: {
    color: '#f4f4f4',
    fontSize: 20,
  },
  ratingStar: {
    color: '#fc5c14',
    fontSize: 20,
  },
});
