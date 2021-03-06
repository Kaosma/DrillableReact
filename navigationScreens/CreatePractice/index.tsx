import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Icon, InlineIcon } from '@iconify/react';
import { styles } from './styles';
import { DrillsContext } from '../../Context';
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
        style={styles.addDrillButton}
        onPress={() => {
          navigation.navigate('DrillBank');
        }}
      >
        {/*<Text style={{fontFamily: 'System', color: '#ff7315', fontSize:'55'}}>ADD DRILL</Text>*/}
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
      <View style={styles.listContainer}>
        <FlatList
          data={practiceDrills}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.drillItemContainer}>
                <View style={styles.leftContainer}>
                  <View style={styles.indexContainer}>
                    <Text style={styles.indexText}>{index + 1}</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                  </View>
                </View>

                <View style={styles.rightContainer}>
                  <View style={styles.durationContainer}>
                    <Text style={styles.durationText}>{item.duration}min</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeDrillButton}
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
                    style={styles.viewDrillButton}
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
          style={styles.doneButton}
          onPress={() => {
            navigation.navigate('PracticeSettings', { practiceDrills });
          }}
        >
          <Text style={styles.doneButtonText}>DONE</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
