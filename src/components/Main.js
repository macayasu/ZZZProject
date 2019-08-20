import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import {
	AsyncStorage,
	Alert
  } from 'react-native';
import LoginScreen from './Login/LoginScreen';
import RegisterScreen from './Register/RegisterScreen';
import HomeScreen from './Home/HomeScreen';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  tokenUser: ''
		};
	  }

	  componentDidMount() {
		AsyncStorage.getItem("tokenUser").then((value) => {
			this.setState({
				"tokenUser": value
			});
			this.state.tokenUser!== null||this.state.tokenUser!==undefined ? Actions.homeScreen({token: value}) : Actions.loginScreen();
			
		})
	  }
	  
  render() {
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene key="loginScreen"
	          component={LoginScreen}
	          animation='fade'
	          hideNavBar={true}
	          initial={true}
	        />
			<Scene key="registerScreen"
	          component={RegisterScreen}
	          animation='fade'
			  hideNavBar={true}
	        />
			<Scene key="homeScreen"
			  component={HomeScreen}
	          animation='fade'
			  hideNavBar={true}
	        />
	      </Scene>
	    </Router>
	  );
	}
}