import React from 'react';
import { Icon } from '@iconify/react';
//import starFilled from '@iconify-icons/ant-design/star-filled';
//import starOutlined from '@iconify-icons/ant-design/star-outlined';

// Custom star component
export default class Star extends React.Component {
  render() {
    return (
      <Icon
        icon={
          require('') /*this.props.filled === true ? starFilled : starOutlined*/
        }
        height="30"
        width="30"
        style={{ color: '#ff7315' }}
      />
    );
  }
}
