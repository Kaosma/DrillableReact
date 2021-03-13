import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { Icon, InlineIcon } from '@iconify/react';
import { styles } from './styles';
import { DrillsContext } from '../../Context';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

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
        <Image
          source={require('../../assets/icons8-plus-math-90.png')}
          style={{height: 35, width: 35, tintColor: '#f4f4f4'}}
        />
      </TouchableOpacity>
    );
  };

  // Drill class interface
  interface Drill {
    title: string;
    id: string;
    duration: number;
    numberOfPlayers: number;
    recommendedNumber: number;
    imageUrl: string;
    description: string;
    category: string;
    level: number;
    numberOfRatings: number;
  }

  const renderItem = useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<Drill>) => {
      return (
        <View style={styles.drillItemContainer}>
          <View style={styles.leftContainer}>
            {/*<View style={styles.indexContainer}>
              <Text style={styles.indexText}>{index + 1}</Text>
      </View>*/}
            <TouchableOpacity
              style={styles.titleContainer}
              onPress={() => {
                navigation.navigate('ViewDrill', item);
              }}
            >
              <Text numberOfLines={2} style={styles.titleText}>{item.title}</Text>
            </TouchableOpacity>
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
              <Image
                source={require('../../assets/icons8-trash-480.png')}
                style={{ height: 35, width: 35, tintColor: '#fc5c14' }}
              />
              {/*<Icon
                icon={xCircle}
                height="40"
                width="40"
                style={{ color: '#fc5c14' }}
              />*/}
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewDrillButton} onLongPress={drag}>
              <Image
                source={require('../../assets/icons8-resize-vertical-52.png')}
                style={{height: 35, width: 35, tintColor: '#f4f4f4'}}
              />
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
    },
    []
  );


  // Returning the practice screen
  return (
    <View style={styles.rootContainer}>
      <View style={styles.listContainer}>
        <DraggableFlatList
          data={practiceDrills}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          onDragEnd={({ data }) => setDrills(data)}
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
