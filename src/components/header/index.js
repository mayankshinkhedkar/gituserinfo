import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Styles from './style';

export default class Header extends Component {
  render = () => {
    return(
      <View style={Styles.mainView}>
        <Text style={Styles.headerText}>{this.props.headerTitle !== undefined || this.props.headerTitle !== null ? this.props.headerTitle : 'Header Title' }</Text>
      </View>
    );
  }
}