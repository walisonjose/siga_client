import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, ToastAndroid, ImageBackground } from 'react-native';

import Toast from 'react-native-simple-toast';

import * as WebBrowser from "expo-web-browser";
import { StackActions, NavigationActions } from 'react-navigation';

//import CookieManager from 'react-native-cookies';

const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking.android')
 
import api2 from '../../services/api2';

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
    email: '',
    itemId: null,
    password: '',
    error: '',
  };

  _openBeposForgotPassword = async () => {
    this._openSafariWebView(resetPasswordURL);
};

_openSafariWebView = async _URL => {
  await WebBrowser.openBrowserAsync(_URL);
};

  handleEmailChange = (email) => {
    email = email.trim();

    

    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };



  loginUserSiga = async () => {


    var email = null;
    if(this.state.email.indexOf("@") === -1){
     

      email = this.state.email.concat("@aparecida.go.gov.br") ;

     
      console.log("Passou aqui! "+email);
   }else{
     email = this.state.email;
   }

   // console.log(this.state.email);


    const response = await api2.post('/users/sign_in.json?user[login]='+this.state.email+'&user[password]='+this.state.password)
    .then(response =>{

      //Toast.show('Tudo certo! Pode logar!', Toast.SHORT, [
      //  'UIAlertController',
      //]);
     // console.log("Cookie-> "+response.headers["set-cookie"]);
     
      console.log("passou aqui!!");
     this.props.navigation.navigate('Map', {
      itemId: this.state.itemId,
      
    });
      
      /*
      CookieManager.getAll()
      .then((response) => {
       
        console.log('CookieManager.getAll =>', response.request.responseHeaders._Siga_session);
      });
      
      this.setState({ docs: response.data.status });

     console.log('CookieManager.getAll =>', response.headers["set-cookie"]);*/ 
    }).catch(
      function (error) {
        
        console.log("Ops! Login ou senha inválidos!");

        Toast.show('Ops! Login ou senha inválidos!', Toast.SHORT, [
          'UIAlertController',
        ]);
        //return Promise.reject(error)
      }
    );
  }



  handleSignInPress = async () => {

var statusLogin = 0;
    

    if (this.state.email.length === 0 || this.state.password.length === 0) {
     
      Toast.show('Preencha usuário e senha para continuar.', Toast.SHORT, [
        'UIAlertController',
      ]);

      statusLogin++;
    } else {
    

if(this.state.email.indexOf("@") === -1){

 var email = this.state.email.concat("@aparecida.go.gov.br") ;

  this.setState({ email: email });

  this.loginUserSiga();
}else{

  var indexemail = this.state.email.indexOf("@");
  
  var element = "";
  indexemail++;

  for (let index = indexemail; index < this.state.email.length; index++) {
    element = element.concat(this.state.email.charAt(index));
    
  }

if(element != "aparecida.go.gov.br"){
  Toast.show('Apenas e-mails institucionais são permitidos!(@aparecida.go.gov.br)', Toast.SHORT, [
    'UIAlertController',
  ]);
  statusLogin++;
}


  
}



//if(this.state.email === "walison.jose" || this.state.email === "walison.deus" ){
  
  /*if(this.state.email === "walison.jose"){
    this.state.itemId = 0;
  }else{
    this.state.itemId = 1;
  }
 
  console.log("ID: "+this.state.itemId);*/

  //this.props.navigation.navigate('Map', {
   // itemId: this.state.itemId,
    
  //});

/*}else{
  this.state.itemId = 1;
  console.log("ID: "+this.state.itemId);

  this.props.navigation.navigate('UserDelivery', {
    itemId: this.state.itemId,
    
  });
//}



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

     
    }




console.log("-> "+statusLogin);

    //Se o email estiver OK o fluxo continua
if(statusLogin === 0){

this.loginUserSiga();
}

statusLogin = 0;

  };

  render() {
    return (

    
<Container>

  { RCTNetworking.clearCookies(() => { })}
      <ImageBackground  style={{width: '100%', height: '100%' }} source={require('../../images/backgroundaparecida.png')}  resizeMode="contain" >
      
        <StatusBar hidden />
        <Logo style={{width: 200,height:200, top: 40, alignSelf: 'center'}} source={require('../../images/icon_lock.png')} resizeMode="contain" />
        <Logo style={{width: 40,height:40, top: 87, left: 10}} source={require('../../images/icon_user.png')} resizeMode="contain" />
         <Input
          placeholder="Usuário"
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
          onPress={this.checkEmailFormat}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
         <SignUpLink  style={{ top: -100 }} onPress={() => { this._openBeposForgotPassword()}}>
          <SignUpLinkText style={{textDecorationLine: 'underline'}} >Esqueceu sua senha?</SignUpLinkText>
        </SignUpLink>

        {/*this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage> */}
        <Button style={{ top: -120 }} onPress={this.handleSignInPress}>
          <ButtonText >ENVIAR</ButtonText>
        </Button>
       
      
      </ImageBackground>
      </Container>
    );
  }
}