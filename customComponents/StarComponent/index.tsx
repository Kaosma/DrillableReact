import React from 'react';
import { Icon } from '@iconify/react';
import { View, Image } from 'react-native';
import starFilled from '@iconify-icons/ant-design/star-filled';
import starOutlined from '@iconify-icons/ant-design/star-outlined';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Custom star component
export default class Star extends React.Component {
  render() {
    return (
      <View>
        <Image
          source={
            this.props.filled === true
              ? require('../../assets/icons8-star-filled-96.png')
              : require('../../assets/icons8-star-96.png')
          }
          style={{ height: 35, width: 35, tintColor: '#ff7315' }}
        />
        {/* <Icon
          icon={this.props.filled === true ? starFilled : starOutlined}
          height="30"
          width="30"
          style={{ color: '#ff7315' }}
        /> */}
      </View>
    );
  }
}
