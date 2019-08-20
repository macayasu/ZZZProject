import React, { Component } from 'react';
import { Content, Form} from 'native-base';
import Background from '../Background';
import Logo from '../Logo';
import Forms from './Form';
import ButtonExt from './ButtonExt';

export default class RegisterScreen extends Component {
  render() {
    return (

      <Background>
        <Content>
          <Form>
          <Logo />
          <Forms />
          <ButtonExt />
          </Form>
        </Content>
      </Background>
    );
  }
}
