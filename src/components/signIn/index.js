import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { StatusBar, ImageBackground, ToastAndroid } from 'react-native';

import Toast from 'react-native-simple-toast';

import * as WebBrowser from "expo-web-browser";
import { StackActions, NavigationActions } from 'react-navigation';
import { savePropsAuthentication, saveToken } from '../actions/AuthenticationActions';

//import CookieManager from 'react-native-cookies'; 

const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking.android')
 
import api2 from '../../services/api2';

import axios from 'axios';

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

 class SignIn extends Component {
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
    email: "walison.deus@aparecida.go.gov.br",
    itemId: null,
    password: "javajade",
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


      console.log(" data: "+response.headers["set-cookie"]);

      
      this.props.savePropsAuthentication({
        
     
       email: this.state.email,
       name: response.data.name,
      avatar: response.data.profile_picture[0],
    token: response.headers["set-cookie"],
    });
  //   saveToken(response.headers["set-cookie"]);
      
     
//this.createRun();







     // console.log("passou aqui!!"+respon);
   this.props.navigation.navigate('Map', {
  //   itemId: this.state.itemId,
      
    });

    }).catch(
      function (error) {
        
        console.log("Ops! Login ou senha inválidos!");
        

      }
    );

  }


  createRun = async () => {

    const token = this.props.token;
/*

const api = axios.create({
  baseURL: 'https://sigadev.aparecida.go.gov.br',
  credentials: "same-origin",
    method: 'POST',
    headers: {
      'Accept': 'application/json', // This is set on request
    'Content-Type': 'application/json',
    'Cookie': token
}
});




  const response = await api.post('/runs/user_create.json?run[origin_lat]=-16.7179881&run[origin_lng]=-49.2650003&run[origin_address]=Teste&run[run_type]=run&run[request_reason_id]=3&run[destination_lat]=-16.7053716&run[destination_lng]=-49.2568214&run[destination_address]=DEstination',
 ) .then(response =>{

console.log("Resposta: "+response.data.id);

    }).catch(
      function (error) {
        
        console.log(error);
        

      }
    ); */

    const url = "https://sigadev.aparecida.go.gov.br";

    const response = await fetch(url+'/runs/user_create.json?run[origin_lat]=-16.7179881&run[origin_lng]=-49.2650003&run[origin_address]=Teste&run[run_type]=run&run[request_reason_id]=3&run[destination_lat]=-16.7053716&run[destination_lng]=-49.2568214&run[destination_address]=DEstination',
   {
    credentials: "same-origin",
    method: 'POST',
    headers: {
      'Accept': 'application/json', // This is set on request
    'Content-Type': 'application/json',
			'Cookie': token
		}
   }
    ).then(response => { return response.json();})
    .then(responseData => {console.log(responseData.id); return responseData;})
          .catch(
            function (error) {
              
              console.log("Deu ruim:"+error);
              
      
            } 
          )


  };


  handleSignInPress = async () => {

var statusLogin = 0;
    

    if (this.state.email.length === 0 || this.state.password.length === 0) {
     
     /* Toast.show('Preencha usuário e senha para continuar.', Toast.SHORT, [
        'UIAlertController',
      ]);*/

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
 /* ToastAndroid.show("Apenas e-mails institucionais são permitidos!(@aparecida.go.gov.br)", ToastAndroid.LONG);*/

  /*Toast.show('Apenas e-mails institucionais são permitidos!(@aparecida.go.gov.br)', Toast.SHORT, [
    'UIAlertController',
  ]);*/
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
      <ImageBackground  style={{width: '105%', height: '105%' }} source={require('../../images/backgroundaparecida.png')}  resizeMode="contain" >
      
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


const mapStateToProps = state => {
  return {
      token: state.AuthenticationReducer.token,
      login: state.AuthenticationReducer.login,
      password: state.AuthenticationReducer.password,
      
  }
};

export default connect(mapStateToProps, { savePropsAuthentication })(SignIn);