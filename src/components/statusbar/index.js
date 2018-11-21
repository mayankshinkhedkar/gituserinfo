import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  View
} from 'react-native';
import Styles from './style';

export default class StatusBarModule extends Component {

  _bar = () => {
    let BarStatus = Platform.select({
      ios: <View
        style={Styles.iOSstatusBar}
      />,
      android: <StatusBar
        backgroundColor={Styles.androidStatusBar.backgroundColor}
        barStyle={Styles.androidStatusBar.barStatus}
      />
    });
    return BarStatus;
  }

  render = () => {
    return <View>
      {this._bar()}
    </View>
  }
}