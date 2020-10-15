import React, { Component } from "react";

import { StatusBar, ImageBackground} from "react-native";
import { connect } from "react-redux";

import * as WebBrowser from 'expo-web-browser';

import Toast from "react-native-tiny-toast";

import {
  savePropsAuthentication,
  saveToken,
} from "../actions/AuthenticationActions";


const  resetPasswordURL = "https://sigadev.aparecida.go.gov.br/pt-BR/users/password/new";

const toastError = (msg) =>
  Toast.show(msg, {
    position: Toast.position.center,
    containerStyle: {
      backgroundColor: "#f00",
      borderRadius: 15,
    },
    textStyle: {
      color: "#fff",
    },

    duration: 2000,
    animation: true,
  });

const toastSucess = (msg) =>
  Toast.show(msg, {
    position: Toast.position.center,
    containerStyle: {
      backgroundColor: "#f00",
      borderRadius: 15,
    },
    textStyle: {
      color: "#fff",
    },

    duration: 2000,
    animation: true,
  });

const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking.android");

import api2 from "../../services/api2";

import axios from "axios";

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
} from "./styles";

import Loader from "../../components/Loader";

class SignIn extends Component {
  state = {
    email: "walison.deus",

    password: "javajade",

    loading: false,
  };

  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(resetPasswordURL);
    
  };


  handleEmailChange = (email) => {
    email = email.trim();

    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  

  loginUserSiga = async () => {
    var email = "";
   if (this.state.email.indexOf("@") === -1) {
      email = this.state.email.concat("@aparecida.go.gov.br");

      console.log("Passou aqui! " + email);
    } else {
      email = this.state.email;
    }  

    console.log("Passou aqui! " + this.state.email);


    const response = await api2
      .post(
        "/users/sign_in.json?user[login]=" +
        email +
          "&user[password]=" +
          this.state.password +
          ""
      )
      .then((response) => {
        this.props.savePropsAuthentication({
          email: response.data.email,
          name: response.data.name,
          avatar: response.data.profile_picture[0],
          token: response.headers["set-cookie"], 
        });

        this.setState({ loading: false });

        this.props.navigation.navigate("Map");
      }).catch(err => { 
          
        toastError("Ops! Login ou senha inválidos!");

        this.setState({ loading: false});
          
          console.log("Ops! Login ou senha inválidos!");
      
      }); 
  };

  _openBeposForgotPassword = async () => {
    this._openSafariWebView(resetPasswordURL);
}; 

  handleSignInPress = async () => {
    this.setState({ loading: true });

    var statusLogin = 0;

    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ loading: false });
      toastError("Preencha usuário e senha para continuar.");

      statusLogin++;
    } else {
      if (this.state.email.indexOf("@") === -1) {
       
       
        this.setState({ email: this.state.email.concat("@aparecida.go.gov.br") }); 

        this.loginUserSiga();
      } else {
        var indexemail = this.state.email.indexOf("@");

        var element = "";
        indexemail++;

        for (let index = indexemail; index < this.state.email.length; index++) {
          element = element.concat(this.state.email.charAt(index));
        }

        if (element != "aparecida.go.gov.br") {
          this.setState({ loading: false });
          toastError(
            "Apenas e-mails institucionais são permitidos!(@aparecida.go.gov.br)"
          );

          statusLogin++;
        }
      }
    }

    if (statusLogin === 0) {
      this.loginUserSiga();
    }

    statusLogin = 0;
  };

  render() {
    return (
      <Container>
        {RCTNetworking.clearCookies(() => {})}

        <ImageBackground
          style={{ width: "100%", justifyContent: "center", flex: 1 }}
          source={require("../../images/backgroundaparecida.png")}
          resizeMode="cover"
        >
          <StatusBar hidden />
          <Logo
            style={{ width: 200, height: 200, top: 60, alignSelf: "center" }}
            source={require("../../images/icon_lock.png")}
            resizeMode="contain"
          />
          <Logo
            style={{ width: 40, height: 40, top: 87, left: 10 }}
            source={require("../../images/icon_user.png")}
            resizeMode="contain"
          />
          <Input
            placeholder="Usuário"
            value={this.state.email}
            style={{ top: -5, left: 43 }}
            onChangeText={this.handleEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Logo
            style={{ width: 40, height: 40, top: 15, left: 10 }}
            source={require("../../images/icon_senha.png")}
            resizeMode="contain"
          />

          <Input
            placeholder="Senha"
            value={this.state.password}
            style={{ left: 43, top: -80 }}
            onChangeText={this.handlePasswordChange}
            
          
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          <SignUpLink
            style={{ top: -100 }}
            onPress={() => {
              console.log("Recuperar senha!");
              this._handlePressButtonAsync();
            }}
          >
            <SignUpLinkText style={{ textDecorationLine: "underline" }}>
              Esqueceu sua senha?
            </SignUpLinkText>
          </SignUpLink>

          <Button style={{ top: -120 }} onPress={this.handleSignInPress}>
            <ButtonText>ENTRAR</ButtonText>
          </Button>

          <Loader show={this.state.loading} />
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.AuthenticationReducer.token,
    login: state.AuthenticationReducer.login,
    password: state.AuthenticationReducer.password,
  };
};

export default connect(mapStateToProps, { savePropsAuthentication })(SignIn);
