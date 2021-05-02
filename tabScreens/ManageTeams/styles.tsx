import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#3a3535',
    alignItems: 'center',
  },
  teamButtonContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    alignItems: 'center',
    maxWidth: 150,
    minWidth: 150,
  },
  teamClubText: {
    color: '#ff7315',
    padding: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  teamGroupText: {
    color: 'black',
    paddingTop: 0,
    padding: 10,
    fontSize: 18,
    fontWeight: '400',
  },
  manageTeamsFAB: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#f4f4f4',
  },
  modalRootContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#f4f4f4',
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 200,
    width: '80%',
  },
  modalHeader: {
    marginTop: 10,
    color: '#3a3535',
    fontFamily: 'System',
    fontSize: 30,
  },
  clubTextInput: {
    color: '#f4f4f4',
    backgroundColor: '#3a3535',
    borderRadius: 3,
    fontSize: 17,
    width: 200,
    marginTop: 20,
    padding: 5,
  },
  groupTextInput: {
    color: '#f4f4f4',
    backgroundColor: '#3a3535',
    borderRadius: 3,
    fontSize: 17,
    width: 200,
    marginTop: 20,
    marginBottom: 20,
    padding: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingBottom: 15,
    paddingLeft: 25,
  },
  modalButtonText: {
    color: '#000000',
    fontFamily: 'System',
    fontSize: 25,
  },
});
