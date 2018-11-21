import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';

export default class SearchBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }

  changedState = (val, key) => {
    this.setState({
      [key]: val
    });
  }

  render = () => {
    const { searchText } = this.state;
    return(
      <View style={Styles.mainView}>
        <View style={Styles.searchBoxMain}>
          <View style={Styles.commonCenterAlign}>
            <TouchableOpacity disabled={true}>
              <Icon name="search" size={20} color="#CCCCCC" />
            </TouchableOpacity>
          </View>
          <View style={Styles.searchInput}>
            <TextInput
              style={[Styles.paddingTopBottom10,{fontSize: 16}]}
              onChangeText={(text) => this.changedState(text, 'searchText')}
              value={searchText}
              placeholder={'Enter user name'}
              underlineColorAndroid={'transparent'}
              returnKeyType={'search'}
              onSubmitEditing={() => searchText !== '' ? this.props.onSearch(searchText) : alert('Search field can\'t be blank')}
            /> 
          </View>
          {
            searchText !== '' &&
              <View style={Styles.commonCenterAlign}>
                <TouchableOpacity style={Styles.paddingTopBottom10} onPress={() => this.changedState('', 'searchText')}>
                  <Icon name="times-circle" size={20} color="#CCCCCC" />
                </TouchableOpacity>
              </View>
          }
        </View>
        {
          searchText !== '' &&
            <View style={[Styles.commonCenterAlign, {marginLeft: 10}]}>
              <TouchableOpacity style={Styles.paddingTopBottom10} onPress={() => this.changedState('', 'searchText')}>
                <Text style={{color: '#1E8AF1', fontSize: 16}}>Cancel</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    );
  }
}