import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Icon, InlineIcon } from '@iconify/react';
import { styles } from '../styles';
import { DrillsContext } from '../Context';
/*import plusSquareFill from '@iconify-icons/bi/plus-square-fill';
import plusOutlined from '@iconify-icons/ant-design/plus-outlined';
import xCircle from '@iconify-icons/bi/x-circle';
import eyeFilled from '@iconify-icons/ant-design/eye-filled';*/

export const CreatePractice = ({ navigation }: { navigation: any }) => {
  const { practiceDrills, setDrills, removeDrill } = useContext(DrillsContext);

  // Returning an "add drill" button at the end of the list
  const EmptySlot = () => {
    return (
      <TouchableOpacity
        style={style.addDrillButton}
        onPress={() => {
          navigation.navigate('DrillBank');
        }}
      >
        {/*<Text style={{fontFamily: 'roboto', color: '#ff7315', fontSize:'55'}}>ADD DRILL</Text>*/}
        {/*<Icon
          icon={plusOutlined}
          width="60"
          height="60"
          style={{ color: '#ff7315' }}
        />*/}
      </TouchableOpacity>
    );
  };

  // Returning the practice screen
  return (
    <View style={styles.rootContainer}>
      <View style={style.listContainer}>
        <FlatList
          data={practiceDrills}
          renderItem={({ item, index }) => {
            return (
              <View style={style.drillItemContainer}>
                <View style={style.leftContainer}>
                  <View style={style.indexContainer}>
                    <Text style={style.indexText}>{index + 1}</Text>
                  </View>
                  <View style={style.titleContainer}>
                    <Text style={style.titleText}>{item.title}</Text>
                  </View>
                </View>

                <View style={style.rightContainer}>
                  <View style={style.durationContainer}>
                    <Text style={style.durationText}>{item.duration}min</Text>
                  </View>
                  <TouchableOpacity
                    style={style.removeDrillButton}
                    onPress={() => {
                      removeDrill(index);
                    }}
                  >
                    {/*<Icon
                      icon={xCircle}
                      height="40"
                      width="40"
                      style={{ color: '#fc5c14' }}
                    />*/}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.viewDrillButton}
                    onPress={() => {
                      navigation.navigate('ViewDrill', item);
                    }}
                  >
                    {/*<Icon
                      icon={eyeFilled}
                      height="45"
                      width="45"
                      style={{ color: '#f4f4f4' }}
                    />*/}
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
        <EmptySlot />
        <TouchableOpacity
          style={style.doneButton}
          onPress={() => {
            navigation.navigate('PracticeSettings', { practiceDrills });
          }}
        >
          <Text style={style.doneButtonText}>DONE</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const style = StyleSheet.create({
  listContainer: {
    width: '90%',
  },
  drillItemContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3a3535',
    borderRadius: 2,
    shadowColor: 'black',
    shadowRadius: 3,
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'row',
  },
  rightContainer: {
    flexDirection: 'row',
  },
  indexContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: '#f4f4f4',
    height: 50,
    margin: 10,
  },
  indexText: {
    color: '#3a3535',
    margin: 10,
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: '#f4f4f4',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  titleText: {
    color: '#3a3535',
    margin: 10,
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  durationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: '#3a3535',
    height: 50,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  durationText: {
    color: '#f4f4f4',
    margin: 10,
    fontSize: 20,
    fontFamily: 'roboto',
    fontWeight: '500',
  },
  viewDrillButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  removeDrillButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
    margin: 10,
  },
  addDrillButton: {
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#3a3535',
    borderWidth: 2,
    borderRadius: 20,
    shadowColor: 'black',
    shadowRadius: 3,
    height: 70,
    width: '100%',
  },
  doneButton: {
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: 20,
    shadowColor: 'black',
    shadowRadius: 3,
    height: 70,
    width: '100%',
  },
  doneButtonText: {
    color: '#f4f4f4',
    fontFamily: 'Roboto',
    fontSize: 20,
  },
});
