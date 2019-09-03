import React, { Component } from 'react';
import { Alert,Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Container, Header, Content, Footer, Tab, Tabs, TabHeading, FooterTab, Button, Icon } from 'native-base';
import config from '../../../config.json';
import api from '../../../Network';
import { connect } from 'react-redux';


export default class HomeScreen extends Component {
  
  constructor(props) {
    super(props)
		this.state = {
      fullName: ''
    }
    
    this.props.token
    }
    
    async componentDidMount() {
        // await api({
        //   method: 'get',
        //   url: 'users'
        // })
        // .then((response) => response.json())
        // .then((response) => {
        //   if(response.message == "Invalid Token") {
        //    Alert.alert('You forbidden to access this page!')            
        //    Actions.loginScreen()
        //   }
        //   else {
        //     console.log(this.state.fullName)
        //    this.setState({fullName: response[0].fullName})
        //   this.render()
        //   } 
        // })
        // .done()
      

      fetch(`${config.baseurl}/users`, {
        method: 'GET',
        headers: {
                   'Authorization': `Bearer ${this.props.token}`,
                 },
      })
      .then((response) => response.json())
      .then((response) => {
        if(response.message == "Invalid Token") {
        Alert.alert('You forbidden to access this page!')            
        Actions.loginScreen()
        }
        else {
        this.setState({fullName: response[0].fullName})
        this.render()
        } 
      })
      .done()
    }
    

    render() {
      return (
        
        <Container>
           <Header />
          <Content>
            <Text>
              {this.state.fullName}
            </Text>
          </Content>
          <Footer>
            <FooterTab>
              <Button>
                <Icon name="apps" />
              </Button>
              <Button>
                <Icon name="camera" />
              </Button>
              <Button active>
                <Icon active name="navigate" />
              </Button>
              <Button>
                <Icon name="person" />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      )
    }
}

// const mapStateToProps = (state) => {
//   return {

//   }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {

//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps) (Main);
