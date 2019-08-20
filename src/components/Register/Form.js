import React, {Component} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  AsyncStorage,
  Alert
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
      fullName: '',
      username: '',
      password: '',
      showPass: true,
      press: false,
      isLoading: false,
      tokenUser: ''
    };
    this.showPass = this.showPass.bind(this);
    this._onPress = this._onPress.bind(this);

  }

  showPass() {
    AsyncStorage.getItem("tokenUser").then((value) => {
      this.setState({"tokenUser": value});
      console.log(this.state.tokenUser)
  })
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
  
      fetch(`${config.baseurl}/users/register`, {
       method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        // body : 
        body: JSON.stringify({
              fullName: this.state.fullName,
              username: this.state.username,
              password: this.state.password,
             })
        })
        .then((response) => {
                    if (response.status == 200) {
                          setTimeout(() => {
                            this.setState({
                              isLoading: false
                          })
                          Actions.loginScreen();
                          Alert.alert('Your account has been created');
                          }, 2300);
                          
                    }else{
                      this.setState({ isLoading: false });
                      setTimeout(() => {
                        Alert.alert('Warning','Username / Password Sudah Ada!');
                      }, 100);        
                    }      
        }).done();
  }


  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image style={styles.inlineImgFullName} source={usernameImg} />
        <TextInput
          style={styles.TextInput}
          placeholder="Full Name"
          placeholderTextColor={'#6c787a'}
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={(text) => this.setState({fullName:text})}
        />
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
            <Button style={styles.ButtonRegister} rounded>
            {this.state.isLoading ? (
              <Spinner color='white' />
            ) : (
              <Text style={styles.TextButton} onPress={this._onPress}>Register</Text>
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
  inlineImgFullName: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  inlineImgUsername: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 60,
  },
  inlineImgPw: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 108,
  },
  btnEye: {
    position: 'absolute',
    top: 108,
    right: 30,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  ButtonRegister: {
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
