import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';


export default class ButtonExt extends Component {
  constructor() {
    super();

    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    setTimeout(() => {
      Actions.registerScreen();
    }, 2300);
    console.log('bisa')
  }

  render() {
    return (
    <View style={styles.container}>
        <TouchableOpacity onPress={this._onPress}>
            <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.text}>Forgot Password?</Text>
        </TouchableOpacity>
    </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'black',
        backgroundColor: 'transparent',
      },
});
