
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AsyncStorage, Text } from 'react-native';
import Loader from '../components/Loader';

import LoginScreen from '../scenes/LoginScreen';
import RegisterScreen from '../../register/RegisterScreen';
import HomeScreen from '../../home/HomeScreen';

import { Actions } from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);

class Root extends Component{
    constructor(props){
        super(props);

        this.state = {
            token: null,
            isStorageLoaded: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
            this.setState({
                token: token !== null,
                isStorageLoaded: true
            })
        });
    }

    componentDidMount() {
        		AsyncStorage.getItem("token").then((value) => {
        			this.setState({
        				"token": value
                    });
      			this.state.token!== null||this.state.token!==undefined ? Actions.HomeScreen : Actions.loginScreen;
                    
        		})
        	  }

    render(){
        let { isLogged } = this.props.login;
        let { token, isStorageLoaded } = this.state;
        if(!isStorageLoaded){
            return (
                <Loader loading={true} />
            )
        }else{
            return(
                <RouterWithRedux>
                    <Scene key='root'>
						<Scene key="loginScreen"
							initial={!token}
							component={LoginScreen}
							animation='fade'
							hideNavBar={true}
							initial={true}
						/>
						<Scene key="registerScreen"
							component={RegisterScreen}
							initial={!token}
							animation='fade'
							hideNavBar={true}
						/>
						<Scene key="homeScreen"
							component={HomeScreen}
							initial={token}
							animation='fade'
							hideNavBar={true}
						/>
                    </Scene>
                </RouterWithRedux>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

export default connect(mapStateToProps)(Root)

// import React, { Component } from 'react';
// import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
// import {
// 	AsyncStorage,
// 	Alert
//   } from 'react-native';
// import LoginScreen from './Login/LoginScreen';
// import RegisterScreen from './Register/RegisterScreen';
// import HomeScreen from './Home/HomeScreen';

// export default class Main extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 		  tokenUser: ''
// 		};
// 	  }

// 	  componentDidMount() {
// 		AsyncStorage.getItem("tokenUser").then((value) => {
// 			this.setState({
// 				"tokenUser": value
// 			});
// 			this.state.tokenUser!== null||this.state.tokenUser!==undefined ? Actions.homeScreen({token: value}) : Actions.loginScreen();
			
// 		})
// 	  }
	  
//   render() {
// 	  return (
// 	    <Router>
// 	      <Scene key="root">
// 	        <Scene key="loginScreen"
// 	          component={LoginScreen}
// 	          animation='fade'
// 	          hideNavBar={true}
// 	          initial={true}
// 	        />
// 			<Scene key="registerScreen"
// 	          component={RegisterScreen}
// 	          animation='fade'
// 			  hideNavBar={true}
// 	        />
// 			<Scene key="homeScreen"
// 			  component={HomeScreen}
// 	          animation='fade'
// 			  hideNavBar={true}
// 	        />
// 	      </Scene>
// 	    </Router>
// 	  );
// 	}
// }