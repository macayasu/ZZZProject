import React, { Component } from 'react';
import { StyleSheet, ImageBackground} from 'react-native';

export default class Background extends Component {
  render() {
    return (
      <ImageBackground style={styles.background}>
          {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    background: {
      backgroundColor: '#12b8d6',
      flex: 1,
      padding: 20,
      paddingTop: 200,
      width: null,
      height: null,
      resizeMode: 'cover',
    }
})