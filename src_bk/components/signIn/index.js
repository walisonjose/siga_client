import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, ImageBackground } from 'react-native';

import * as WebBrowser from "expo-web-browser";
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  styleBackground,
  SignUpLinkText,
  
} from './styles';

const resetPasswordURL = 'https://sigadev.aparecida.go.gov.br/pt-BR/users/password/new'

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    email: 'walison.jose',
    itemId: null,
    password: '123456',
    error: '',
  };

  _openBeposForgotPassword = async () => {
    this._openSafariWebView(resetPasswordURL);
};

_openSafariWebView = async _URL => {
  await WebBrowser.openBrowserAsync(_URL);
};

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
console.log(this.state.email);

if(this.state.email === "walison.jose" || this.state.email === "walison.deus" ){
  
  /*if(this.state.email === "walison.jose"){
    this.state.itemId = 0;
  }else{
    this.state.itemId = 1;
  }
 
  console.log("ID: "+this.state.itemId);*/

  this.props.navigation.navigate('Map', {
    itemId: this.state.itemId,
    
  });

}else{
  this.state.itemId = 1;
  console.log("ID: "+this.state.itemId);

  this.props.navigation.navigate('UserDelivery', {
    itemId: this.state.itemId,
    
  });
}



       /* const response = await api.post('/sessions', {
          email: this.state.email,
          password: this.state.password,
        });

        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main', params: { token: response.data.token, email: 'byla' } }),
          ],
        });
        this.props.navigation.dispatch(resetAction);*/
     //   this.props.navigation.navigate('Main', {
       //   itemId: this.state.itemId,
          
      //  });

      } catch (_err) {
       // this.setState({ error: ''+_err });
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };

  render() {
    return (
<Container>
      <ImageBackground  style={{width: '100%', height: '100%' }} source={require('../../images/backgroundaparecida.png')}  resizeMode="contain" >
      
        <StatusBar hidden />
        <Logo style={{width: 200,height:200, top: 40, alignSelf: 'center'}} source={require('../../images/icon_lock.png')} resizeMode="contain" />
        <Logo style={{width: 40,height:40, top: 87, left: 10}} source={require('../../images/icon_user.png')} resizeMode="contain" />
         <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          style={{top: -5, left: 43 }}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Logo style={{width: 40,height:40, top: 15, left: 10}} source={require('../../images/icon_senha.png')} resizeMode="contain" />
       
        <Input
          placeholder="Senha"
          value={this.state.password}
       style={{ left: 43, top: -80 }}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
         <SignUpLink  style={{ top: -100 }} onPress={() => { this._openBeposForgotPassword()}}>
          <SignUpLinkText style={{textDecorationLine: 'underline'}} >Esqueceu sua senha?</SignUpLinkText>
        </SignUpLink>

        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <Button style={{ top: -120 }} onPress={this.handleSignInPress}>
          <ButtonText >ENVIAR</ButtonText>
        </Button>
       
      
      </ImageBackground>
      </Container>
    );
  }
}