import React, {Component} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  AsyncStorage,
  Alert,
  Keyboard
} from 'react-native';

import { Button, Spinner } from 'native-base';
import {Actions, ActionConst} from 'react-native-router-flux';
import usernameImg from '../../images/username.png';
import passwordImg from '../../images/password.png';
import eyeImg from '../../images/eye_black.png';
import config from '../../../config.json';

export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPass: true,
      press: false,
      isLoading: false
      
    };
    this.showPass = this.showPass.bind(this);
    this._onPress = this._onPress.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  _onPress() {
    Keyboard.dismiss();
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
  
      fetch(`${config.baseurl}/users/authenticate`, {
       method: 'POST',
       headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
        // body : 
        body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
             })
        })
        .then((response) => response.json())
        .then((response) => {
                    if (response.token != undefined) {
                       AsyncStorage.setItem('tokenUser', response.token);
                       AsyncStorage.setItem('idUser', response.id);
                       AsyncStorage.setItem('Username', response.username);
                          setTimeout(() => {
                            this.setState({isLoading: false});
                            Actions.homeScreen({token: response.token});
                          }, 2300);
                         
                    }else{
                      setTimeout(() => {
                        this.setState({ isLoading: false });
                        Alert.alert('Warning','Username / Password Salah!');
                      }, 100);        
                    }
                  
        }).done();
  }



  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <Image style={styles.inlineImgUsername} source={usernameImg} />
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor={'#6c787a'}
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={(text) => this.setState({username:text})}     
        />
        <Image style={styles.inlineImgPw} source={passwordImg} />
        <TextInput
          style={styles.TextInput}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          placeholderTextColor={'#6c787a'}
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={(text) => this.setState({password:text})}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>

        <TouchableOpacity onPress={this._onPress}>
            <Button style={styles.ButtonLogin} rounded>
            {this.state.isLoading ? (
              <Spinner color='white' />
            ) : (
              <Text style={styles.TextButton} onPress={this._onPress}>Login</Text>
            )}
            </Button>
        </TouchableOpacity>
      </KeyboardAvoidingView>
     
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  TextInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 10,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20
  },
  inlineImgUsername: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  inlineImgPw: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 60,
  },
  btnEye: {
    position: 'absolute',
    top: 58,
    right: 30,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  ButtonLogin: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    padding: 10,
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextButton: {
        color: '#ffffff' 
    }
});
