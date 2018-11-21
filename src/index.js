import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  ScrollView,
  View
} from 'react-native';
import styles from './style';
import StatusBarModule from './components/statusbar';
import Header from './components/header';
import SearchBar from './components/searchbar';

export default class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowing: false,
      isUserExist: false,
      isLoding: false,
      userInfo: {},
      userRepo: [],
      commonURL: 'https://api.github.com/users/'
    }
  }

  getDataGit = async (endpoint) => {
    try {
      let response = await fetch(
        `${this.state.commonURL}${endpoint}`,
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      alert(error);
      return false;
    }
  }

  _onSubmitSearch = (text) => {
    this.setState({
      isLoding: true,
    }, () => {
      this._getGitAPI(text);
    });
  }

  _getGitAPI = async (text) => {
    let infoUser = await this.getDataGit(text);
    let repoUser = await this.getDataGit(`${text}/repos`);

    /**
     * To handle the API Catch
     */
    if(!infoUser && !repoUser) {
      this.setState({
        isLoding: false
      })
      return false;
    }
      
    this.setState({
      isShowing: false,
      isUserExist: false,
      userInfo: infoUser,
      userRepo: repoUser,
    }, () => {
      this.setState({
        isUserExist: this.state.userInfo.message ? false : true,
        isShowing: true,
        isLoding: false
      })
    });
  }

  _keyExtractor = (item, index) => item.name;

  _renderItem = ({ item }) => {
    return (
      <View style={styles.repoList}>
        <Text numberOfLines={2} style={styles.repoTitle}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.repoDes}>{item.description}</Text>
      </View>
    );
  }

  renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  }

  _renderListEmpty = () => {
    return (
      <View style={styles.centerView}>
        <Text style={styles.userName}>Don't have Repositories Yet</Text>
      </View>
    );
  }

  render = () => {
    const { isLoding, isShowing, isUserExist, userInfo, userRepo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBarModule />
        <Header
          headerTitle={'Github User'}
        />
        <SearchBar
          onSearch={this._onSubmitSearch}
        />
        {
          isLoding ? <View style={styles.centerView}>
            <ActivityIndicator size="large" color="#1E8AF1" />
          </View> :
            isShowing && (isUserExist ? <View style={{ backgroundColor: 'yellow', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <View style={styles.top10}>
                  <Image
                    source={{ uri: userInfo.avatar_url }}
                    style={styles.userImage}
                  />
                  <Text style={styles.userName}>{userInfo.name}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.repoMainView}>
                      <Text style={styles.repoText}>Repositories</Text>
                    </View>
                    <View style={[styles.top10, { marginBottom: 20, backgroundColor: 'red' }]}>
                      <FlatList
                        data={userRepo}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListEmptyComponent={this._renderListEmpty}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View> : <View style={styles.centerView}>
                <Text style={styles.userName}>User name not found</Text>
              </View>
            )
        }
      </View>
    );
  }
}