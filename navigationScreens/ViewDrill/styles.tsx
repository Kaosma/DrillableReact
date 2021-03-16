import { StyleSheet } from 'react-native';

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
    width: '91%',
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
    textAlign: 'center',
  },
  ratingText: {
    color: '#f4f4f4',
    fontSize: 20,
  },
  opacityText: {
    fontSize: 20,
    opacity: 0,
  },
  detailedInfoContainer: {
    marginTop: 20,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomInfoContainer: {
    marginTop: 20,
    justifyContent: 'center',
  },
  equipmentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoText: {
    color: '#f4f4f4',
    fontSize: 20,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  drillImage: {
    width: 200,
    height: 200,
  },
});
