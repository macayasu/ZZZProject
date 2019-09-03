import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Main from './src/components/login';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Main />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('login', () => Login);
