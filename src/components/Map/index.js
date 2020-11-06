import React, { Component, Fragment, useState, useEffect } from "react";
import {
  View,
  Platform,
  Modal,
  Image,
  Text,
  Menu,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  Alert,
} from "react-native";
import MapView, { Marker, Callout, AnimatedRegion } from "react-native-maps";

import { Avatar, IconButton, Colors } from "react-native-paper";

import Geocoder from "react-native-geocoding";

//import Geolocation from 'react-native-geolocation-service';

import Icon from "react-native-vector-icons/MaterialIcons";

const GOOGLE_MAPS_APIKEY = "AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860";

import { getPixelSize } from "../../utils";

import Search from "../Search";
import DriverDetails from "./driverDetails";
import Origin from "../Search/origin";

import SideMenu from "react-native-side-menu";

import Directions from "../Directions";
import Details from "../Details";

import BottomDrawer from "rn-bottom-drawer";

import "react-native-gesture-handler";

import { MenuSiga } from "../Menu/index";

import uberx from "../../assets/uberx.png";

import api from "../../services/api";
import api2 from "../../services/api2";

const TAB_BAR_HEIGHT = 50;
const HEADER_HEIGHT = 0;

import markerImage from "../../assets/marker.png";
import backImage from "../../assets/back.png";

import DrawnerMenu from "../../drawner.js";

import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

import { NavigationContainer, DrawerActions } from "@react-navigation/native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { connect } from "react-redux";

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  LocationTimeBoxRun,
  LocationTimeTextRun,
  LocationTimeTextSmallRun,
  RequestButton,
  LocationBoxRun,
  RequestButtonText,
  LocationTextRun,
  Logo,
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  Button,
  ButtonText,
} from "./styles";

console.disableYellowBox = true;

import Toast from "react-native-tiny-toast";

import googlemaps from "../../services/api";

import Timer from "./timer";

import AsyncStorage from "@react-native-community/async-storage";

import RNGooglePlaces from "react-native-google-places";
import { CAMERA } from "expo-permissions";
import driverDetails from "./driverDetails";

import * as Location from "expo-location";

const {
  setIntervalAsync,
  clearIntervalAsync,
} = require("set-interval-async/dynamic");

import normalize from "react-native-normalize";

import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const URL = "https://siga.aparecida.go.gov.br"; 
const TIME_RUN = 55;

/* Configuração do Toast*/

const toastError = (msg) =>
  Toast.show(msg, {
    position: Toast.position.center,
    containerStyle: {
      backgroundColor: "#cc0000",
      borderRadius: 15,
    },
    textStyle: {
      color: "#fff",
    },
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 2000,
    animation: true,
  });

const toastSucess = (msg) =>
  Toast.show(msg, {
    position: Toast.position.center,
    containerStyle: {
      backgroundColor: "#3CB371",
      borderRadius: 15,
    },
    textStyle: {
      color: "#fff",
    },
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 2000,
    animation: true,
  });

class Map extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  static navigationOptions = {
    headerShown: false,
  };

  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    },

    point: {
      latitude: -16.8173241,
      longitude: -49.2537338,
      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    },

    coordinate: new AnimatedRegion({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    }),
    place: "",

    buttonAddress: 0,

    markers: [{ latitude: 0.001, longitude: 0.0 }],

    destination: { latitude: 0, longitude: 0 },
    origin: { latitude: 0, longitude: 0 },
    duration: null,
    location: null,
    origem: "",
    short_origin: null,
    destino: "",
    short_destination: null,
    search_adress: false,
    startUp: true,
    dim: 250,
    top_origin: -30,
    top_destino: 25,
    marker: null,
    marker_motora: null,
    timer: false,
    secs: 0,
    cancel_timer: 0,
    id_run: null,
    run_status: 0 /* a corrida pode ter 4 estados. 
    1 - Aceita; 2 - Iniciada; 3 - Finalizada; 4 - Cancelada;
    */,

    show_route_origin_destination: true,

    /* modal de início da corrida */
    modal_run_started: false,
    modal_run_started_cont: 0,

    modal_run_cancel: false,
    modal_run_cancel_cont: 0,

    modal_run_finish: false,
    modal_run_finish_cont: 0,

    /*estado aguardando check-in*/
    run_wait_checkin: 0,
    modal_run_accept: false,
    modal_run_accept_cont: 0,
    /*estado corrida iniciada*/
    run_started: false,
    /*estado corrida finalizada*/
    run_finished: false,

    driver: null,
    driver_location: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    },
    driver_lat: null,
    driver_lng: null,

    hasLocationPermissions: false,
    locationResult: null,

    /*estados que configuram o BootomDrawner*/

    full_dim: 350,
    openBottomDrawer: false,
    show_welcome_msg: true,
    welcome_msg: null,
    welcome_msg_top: 35,

    /*Configs para origem e destino definidos 

    top_origin_label: 35,
    top_origin_textinput:75,
    top_origin_icon:40,

    top_destination_label: 60,
    top_destination_textinput:80,
    top_destination_icon:35 */

    top_origin_label: 10,
    top_origin_textinput: 30,
    top_origin_icon: -35,
    button_alter_address_origin: -125,

    top_destination_label: -10,
    top_destination_textinput: 65,
    top_destination_icon: 25,
    button_alter_address_destination: -5,

    msg_duration: null,

    /*variavé para contar a quantidade de renovações de corrida*/
    cont_renew: 0,

    platform: null,
  };

  getDurationMsgs = (index) => {
    var msg = null;

    if (this.state.duration > 0) {
      if (index === 0) {
        msg =
          "O destino fica a " + this.state.duration + " minutos de distância.";
      }
      if (index === 1) {
        msg =
          "O motorista está a " +
          this.state.duration +
          " minutos de distância.";
      }
      if (index === 3) {
        msg =
          "O destino fica a " + this.state.duration + "minutos de distância.";
      }
    } else {
      msg = "Defina o destino para solicitar um motorista.";
    }

    return msg;
  };

  /*TESTES TIMER */

  getTimer = () => {
    this.state.interval = setInterval(() => {
      if (this.state.secs > 50) {
        console.log("parou!! ");
        clearInterval(this.state.interval);
      }

      if (this.state.cancel_timer === 1) {
        console.log("parou!! ");
        clearInterval(this.state.interval);
      }

      this.setState({ secs: this.state.secs + 1 });

      // console.log("Cont "+ this.state.secs)
    }, 1000);
  };

  /* Essa função é responsável por retronar o componente do botão para solictação da corrida de acorodo com a plataforma(IOS ou Android)*/

  getButtonPlatform = () => {
    if (this.state.platform === 0) {
      return this.state.duration > 0 &&
        this.state.run_wait_checkin === 0 &&
        this.state.run_started === false ? (
        <Button
          onPress={() => {
            this.timer();
          }}
          style={{
            borderRadius: 0,
            width: "100%",
            marginLeft: -10,
            bottom: normalize(30),
          }}
        >
          <ButtonText
           
            style={{ color: "#307597", fontSize: 18 }}
          >
            CHAMAR CARRO
          </ButtonText>
        </Button>
      ) : (
        <Button
          style={{
            borderRadius: 0,
            width: "100%",
            marginLeft: -10,
            bottom: normalize(30),
          }}
          onPress={() => {
            this.showDriverData();
          }}
        >
          <ButtonText style={{ color: "#307597", fontSize: 18 }}>
            INFO
          </ButtonText>
        </Button>
      );
    } else {
      return this.state.duration > 0 &&
        this.state.run_wait_checkin === 0 &&
        this.state.run_started === false ? (
        <TouchableHighlight
        underlayColor="transparent"
          onPress={() => {
            this.timer();
          }}
        >
          <Button
            onPress={() => {
              this.timer();
            }}
            style={{
              borderRadius: 0,
              width: "100%",
              marginLeft: -10,
              bottom: normalize(30),
            }}
          >
            <ButtonText
              // onPress={() => {
              //  this.timer();
              // }}
              style={{ color: "#307597", fontSize: 18 }}
            >
              CHAMAR CARRO
            </ButtonText>
          </Button>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight

        underlayColor="transparent"
          onPress={() => {
            this.showDriverData();
          }}
        >
          <Button
            style={{
              borderRadius: 0,
              width: "100%",
              marginLeft: -10,
              bottom: normalize(30),
            }}
            onPress={() => {
              this.showDriverData();
            }}
          >
            <ButtonText style={{ color: "#307597", fontSize: 18 }}>
              INFO
            </ButtonText>
          </Button>
        </TouchableHighlight>
      );
    }
  };

  /*Métodos que salvas as coordenadas já definidas em um corrida em andamento.*/

  deleteDataRun = async () => {
    try {
      await AsyncStorage.removeItem("@rundata");
    } catch (err) {
      console.log(`The error is: ${err}`);
    }
  };

  storeDataRun = async (value) => {
    try {
      const run = {
        run: {
          id: this.state.id_run,
          origem: {
            lat: this.state.origin.latitude,
            long: this.state.origin.longitude,
            latitudeDelta: 0.0491,
            longitudeDelta: 0.0375,
          },
          destination: {
            lat: this.state.destination.latitude,
            long: this.state.destination.longitude,
            latitudeDelta: 0.0491,
            longitudeDelta: 0.0375,
          },
        },
      };

      const jsonValue = JSON.stringify(run);
      await AsyncStorage.setItem("@rundata", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  getDataSync = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@rundata");

      if (jsonValue) {
        console.log("Button " + this.state.buttonAddress);

        const { run } = JSON.parse(jsonValue);

        console.log("Dados -> " + run.id);

        this.setState({
          origin: {
            latitude: parseFloat(run.origem.lat),
            longitude: parseFloat(run.origem.long),
            latitudeDelta: 0.0491,
            longitudeDelta: 0.0375,
          },
        });
        //if(this.state.short_origin === null){
        this.getSomeAddress(this.state.origin, 0);

        // this.getAddress(this.state.origin);
        console.log("Button " + this.state.buttonAddress);
        this.setState({
          destination: {
            latitude: parseFloat(run.destination.lat),
            longitude: parseFloat(run.destination.long),
            latitudeDelta: 0.0491,
            longitudeDelta: 0.0375,
            buttonAddress: 0,
          },
        });
        // if(this.state.short_destination === null){
        this.getSomeAddress(this.state.destination, 1);
        //  }

        //this.getAddress(this.state.destination);
        //  this.setState({ buttonAddress: 0 });

        this.setState({ id_run: run.id });

        console.log("Dados -> " + run.id);

        this.getDataRun();
      }

      return "Dados carregados";

      // return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
      console.log("Deu algo de errado-> " + e);
    }
  };

  googleSearch(button) {
    console.log(button);

    this.setState({
      buttonAddress: button,
      startUp: false,
      search_adress: true,
    });
  }

  getSomeAddress = async (coordinate, type) => {
    const response = await api
      .post(
        "/geocode/json?latlng=" +
          coordinate.latitude +
          "," +
          coordinate.longitude +
          "&key=AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860"
      )
      .then((response) => {
        if (type === 0) {
          this.setState({
            origem: response.data.results[0].formatted_address,
            origin: coordinate,
            point: coordinate,
            short_origin:
              response.data.results[0].address_components[1].short_name,
          });
        } else {
          this.setState({
            destino: response.data.results[0].formatted_address,
            destination: coordinate,
            point: coordinate,
            short_destination:
              response.data.results[0].address_components[1].short_name,
            run_status: this.state.origin.latitude != 0 ? 2 : 1,
            //buttonAddress: 0,
          });

          this.sheetRef.current.snapTo(0);

          this.mapView.animateCamera({
            center: {
              latitude: this.state.destination.latitude,
              longitude: this.state.destination.longitude,
            },
          });
        }
      })
      .catch(function (error) {
        toastError("Ocorreu algum erro ao obter os dados da corrida!");
        console.log("Login ou senha inválidos!");
      });
  };

  getAddress = async (coordinate) => {
    const response = await api
      .post(
        "/geocode/json?latlng=" +
          coordinate.latitude +
          "," +
          coordinate.longitude +
          "&key=AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860"
      )
      .then((response) => {
        if (this.state.buttonAddress === 0) {
          this.setState({
            origem: response.data.results[0].formatted_address,
            origin: coordinate,
            point: coordinate,
            short_origin:
              response.data.results[0].address_components[1].short_name,
            buttonAddress: 1,
          });

          //this.mapView.animateToRegion(this.state.origin, 1000);
          {
            /* 
          this.mapView.animateCamera({
            center: {
              latitude: this.state.origin.latitude,
              longitude: this.state.origin.longitude,
            },
          }); */
          }

          this.mapView.animateToRegion(this.state.region, 200);
        } else {
          this.setState({
            destino: response.data.results[0].formatted_address,
            destination: coordinate,
            point: coordinate,
            short_destination:
              response.data.results[0].address_components[1].short_name,
            run_status: this.state.origin.latitude != 0 ? 2 : 1,
            buttonAddress: 0,

            /*Ajustando o Bootom Drawner

              top_origin_label: 25,
              top_origin_textinput:65,
              top_origin_icon:45,
              button_alter_address_origin: 30,
          
              top_destination_label: 30,
              top_destination_textinput:70,
              top_destination_icon: 40,
              button_alter_address_destination:  25 */
          });
          //this.mapView.animateToRegion(this.state.destination, 1000);

          this.sheetRef.current.snapTo(0);

          this.mapView.animateCamera({
            center: {
              latitude: this.state.destination.latitude,
              longitude: this.state.destination.longitude,
            },
          });

          // this.marker.showCallout();
        }
      })
      .catch(function (error) {
        console.log("Login ou senha inválidos!");
      });
  };

  showDriverData = () => {
    if (this.state.id_run) {
      this.props.navigation.navigate("driverDetails", {
        driver: this.state.driver,
        duration: this.state.duration,
      });
    } else {
      toastSucess("Vc precisa solicitar uma corrida primeiro.");
    }
  };

renovar = () =>{

  if(this.state.cont_renew >= 3  ){
    toastSucess("Cancelar corrida!");
    this.cancel_run();
    // this.setState({ cont_renew : 0 });
    //console.log("Cancelar corrida!");
 }else{

   //  console.log("Renovar!!");
     this.setState({ cont_renew: this.state.cont_renew + 1 });
     console.log("Renovar timer e corrida!");
     toastSucess("Renovar timer e corrida!");
    this.renew_run();
     this.timer();
   }

};



  timer = async () => {
    //this.getDataRun();

    if(this.state.cont_renew === 0){
      this.create_run();
    }
    

    this.setState({ timer: true, secs: TIME_RUN});

    this.state.interval = setInterval(() => {

      console.log(" Cont renew: "+this.state.cont_renew);


      if (this.state.secs === 0 || this.state.cancel_timer === 1  ) {
        console.log("parou!! ");
        clearInterval(this.state.interval);
        this.setState({ timer: false, cancel_timer: 0 });

        //if ( this.state.run_wait_checkin === 0  ) {
        //  toastError(
         //      "Não há motoristas disponíveis! \nPor favor, tente novamente mais tarde!"
         //    );
         //   this.cancel_run();
         // }
      // if(this.state.run_status === 0){
      //  this.renew_run();
      //  this.timer();
     //  }else{
      //  this.cancel_run();
      //  clearInterval(this.state.interval);
      // }

       /*
        if(this.state.cont_renew >= 3  ){
          toastSucess("Cancelar corrida!");
          this.cancel_run();
          // this.setState({ cont_renew : 0 });
          //console.log("Cancelar corrida!");
       }else{
      
         //  console.log("Renovar!!");
           this.setState({ cont_renew: this.state.cont_renew + 1 });
           console.log("Renovar timer e corrida!");
           toastSucess("Renovar timer e corrida!");
          this.renew_run();
           this.timer();
         }

*/
       
       
        //console.log("STATUS-> "+this.state.run_status);

       // if (!this.state.id_run  ) {
         // toastError(
         //   "Não há motoristas disponíveis! \nPor favor, tente novamente mais tarde!"
         // );
        //  this.cancel_run();

         // this.renew_run();
       // }
      }



      if (this.state.id_run != null) {
        this.getDataRun();
        
      }

      this.setState({ secs: this.state.secs - 1 });
    }, 1000);
  };

  renew_run = async () => {

    toastSucess("Renovando corrida!");


    //const url = "https://siga.aparecida.go.gov.br";

    const response = await fetch(
      URL + "/runs/" + this.state.id_run + "/renew",
      {
        credentials: "same-origin",
        method: "POST",

        headers: {
          Accept: "application/json", // This is set on request
          "Content-Type": "application/json",
          Cookie: this.props.token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
      //  toastSucess("Renovando corrida!");
        
       
        return responseData;
      })
      .catch(function (error) {
        console.log("Deu ruim:" + error);
      });
  };



  cancel_run = async () => {

  const token = this.props.token;

    //const url = "https://siga.aparecida.go.gov.br";

    const response = await fetch(
      URL + "/runs/" + this.state.id_run + "/user_cancel",
      {
        credentials: "same-origin",
        method: "POST",
        body: { cancel_explanation: "teste cancelamento!" },
        headers: {
          Accept: "application/json", // This is set on request
          "Content-Type": "application/json",
          Cookie: token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        this.setState({ timer: false, cancel_timer: 1 });
        return responseData;
      })
      .catch(function (error) {
        console.log("Deu ruim:" + error);
      }); 
  };

  modal_run_started = () => {
    this.setState({
      modalVisible: true,
    });
    setTimeout(() => {
      this.setState({
        modalVisible: false,
      });
    }, 5000);
  };

  status_check_run = async () => {
    const token = this.props.token;

    const timer = setIntervalAsync(() => {
     // const url = "https://siga.aparecida.go.gov.br";

      const response = fetch(
        URL + "/runs/" + this.state.id_run + ".json",

        {
          credentials: "same-origin",
          method: "GET",
          headers: {
            Accept: "application/json", // This is set on request
            "Content-Type": "application/json",
            Cookie: token,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          if (
            responseData.accepted_at != null &&
            responseData.started_at === null
          ) {
            const { driver } = responseData;

            console.log("Motorista-> " + driver.name);
            this.setState({
              driver: driver,
              run_wait_checkin: 1, 
              run_status: 1,
            });

            this.getDriverLocation();

            this.setState({
              modal_run_accept: true,
              welcome_msg: "Se dirija ao ponto de partida  da corrida.",
              modal_run_accept_cont: this.state.modal_run_accept_cont + 1,
            });

            if (this.state.modal_run_accept_cont > 5) {
              this.setState({
                modal_run_accept: false,
              });
            }
            //this.sheetRef.current.snapTo(2);
          }

          if (
            responseData.started_at != null &&
            responseData.finished_at === null &&
            responseData.canceled_at === null
          ) {
            this.setState({
              run_status: 2,
              welcome_msg: "Sua viagem começou!",
            });

            console.log("Corrida iniciada!");
            if (this.state.modal_run_started_cont == 0) {
              this.setState({
                run_started: true,
                modal_run_started: true,
                run_wait_checkin: 0,
              });
            }
            this.setState({
              run_started: true,
              modal_run_started_cont: this.state.modal_run_started_cont + 1,
            });

            //deverá ser retirado...
            // if (this.state.modal_run_started != false) {
            //   toastSucess("Corrida iniciada!");
            //  }

            if (this.state.modal_run_started_cont > 5) {
              this.setState({
                run_started: true,
                modal_run_started: false,
                point: this.state.region,
              });
              // this.sheetRef.current.snapTo(2);
              //this.sheetRef.current.snapTo(0);
            }
          }
          if (responseData.finished_at != null) {
            console.log("-> " + this.state.modal_run_finsih_cont);

            this.deleteDataRun();

            // toastSucess("Corrida finalizada com sucesso!");

            this.setState({
              point: this.state.region,
              destination: { latitude: 0, longitude: 0 },
              origin: this.state.region,
              duration: null,
              location: null,
              origem: "",
              short_origin: null,
              destino: "",
              short_destination: null,
              search_adress: false,
              run_wait_checkin: 0,
              buttonAddress: 0,
              run_status: 0,
              run_started: false,
              point: this.state.region,
              show_route_origin_destination: true,
            });

            //  clearIntervalAsync(timer);

            this.setState({
              modal_run_finish: true,
              modal_run_finish_cont: this.state.modal_run_finish_cont + 1,
            });

            console.log(
              "Corrida finalizada!" + this.state.modal_run_finish_cont
            );

            if (this.state.modal_run_finish_cont > 5) {
              this.setState({
                modal_run_finish: false,
                run_finished: true,
                welcome_msg:
                  "Olá " + this.getFirstName() + "! Onde precisa ir?",
              });

              clearIntervalAsync(timer);
            }

            {
              /* 
            if (!this.state.run_finished) {
              clearIntervalAsync(timer);
              this.setState({
                modal_run_finsih: false,
                run_started: false,
              });
            }
            */
            }
          }

          if (responseData.canceled_at != null) {
            //  toastError(
            //    "Corrida cancelada!\n\n Motivo: " +
            //      responseData.cancel_explanation
            //  );
            console.log(
              "Corrida cancelada!\n\n Motivo: " +
                responseData.cancel_explanation
            );

            this.deleteDataRun();

            this.setState({ run_wait_checkin: 0, run_status: 4 });

            this.setState({
              destination: { latitude: 0, longitude: 0 },
              origin: { latitude: 0, longitude: 0 },
              point: this.state.origin,
              duration: null,
              location: null,
              origem: "",
              short_origin: null,
              destino: "",
              short_destination: null,
              search_adress: false,
              run_wait_checkin: 0,
              buttonAddress: 0,
              run_status: 3,
              run_started: false,
            });

            // clearIntervalAsync(timer);

            this.setState({
              modal_run_cancel: true,
              modal_run_cancel_cont: this.state.modal_run_cancel_cont + 1,
            });

            console.log(
              "Corrida finalizada!" + this.state.modal_run_cancel_cont
            );

            if (this.state.modal_run_cancel_cont > 5) {
              this.setState({
                modal_run_cancel: false,
                run_cancel: true,
                welcome_msg:
                  "Olá " + this.getFirstName() + "! Onde precisa ir?",
                point: this.state.region,
              });

              clearIntervalAsync(timer);
            }
          }
        })
        .catch(function (error) {
          console.log("Deu ruim:" + error);
        });
    }, 1000);
    /*

  const url = "https://sigadev.aparecida.go.gov.br";



  this.state.interval = setInterval(async () => {

    if(this.state.run_status === 0 || this.state.run_status === 4 ){
      console.log("Corrida finalizada! ");
      clearInterval(this.state.interval);
     
    }
  
    
 const response = await fetch(url+'/runs/'+this.state.id_run+'.json',

 {
  credentials: "same-origin",
  method: 'GET',
  headers: { 
    'Accept': 'application/json', // This is set on request
  'Content-Type': 'application/json',
    'Cookie': token
  }
 }
  ).then(response => {return response.json();})
  .then((responseData) => {

    console.log(responseData.accepted_at);
   


  
  }

  ) .catch(
          function (error) {
            
            console.log("Deu ruim:"+error);
            
    
          } 
        )



      }, 1000); */
  };

  getDriverLocation = async () => {
    const token = this.props.token;
   // const url = "https://siga.aparecida.go.gov.br";
    const response = await fetch(
      URL + "/runs/" + this.state.id_run + "/driver_location",

      {
        credentials: "same-origin",
        method: "GET",
        headers: {
          Accept: "application/json", // This is set on request
          "Content-Type": "application/json",
          Cookie: token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("pegou as coordenadas");

        const { lat, lng } = responseData;

        const driver_location = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
        };

        this.setState({
          driver_location: driver_location,
          point: driver_location,
        });
      })
      .catch(function (error) {
        console.log("Deu ruim:" + error);
      });
  };

  getDataRun = async () => {
    const token = this.props.token;
   // const url = "https://siga.aparecida.go.gov.br";
    const response = await fetch(
     URL + "/runs/" + this.state.id_run + ".json",

      {
        credentials: "same-origin",
        method: "GET",
        headers: {
          Accept: "application/json", // This is set on request
          "Content-Type": "application/json",
          Cookie: token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        //Pega os dados do motorista

        const { driver } = responseData;

        if (responseData.accepted_at != null) {
          console.log("Corrida aceita!! Seguindo para checkin");
          //  toastSucess("Corrida aceita!!\n Seguindo para checkin");
          this.setState({
            timer: false,
            cancel_timer: 1,
            run_status: 1,
            
            show_route_origin_destination: false,
          });
          // this.mapView.animateToRegion(this.state.origin, 200);
          //  this.sheetRef.current.snapTo(2);

          //salva os dados
          this.storeDataRun();

          this.status_check_run();
        }

        if (
          responseData.driver_has_canceled != null) {


            this.setState({
              timer: false,
              cancel_timer: 1,
  
              destination: { latitude: 0, longitude: 0 },
              origin: { latitude: 0, longitude: 0 },
              duration: null,
              location: null,
              origem: "",
              short_origin: null,
              destino: "",
              short_destination: null,
              search_adress: false,
              run_wait_checkin: 0,
              buttonAddress: 0,
              run_status: 3,
              run_started: false, 
            });
  
            toastError(
              "Corrida cancelada.\n Motivo: " + responseData.cancel_explanation === null ? "Não definido" : responseData.cancel_explanation
            );
          } 


          if ( responseData.canceled_at != null
        ) {
          this.setState({
            timer: false,
            cancel_timer: 1,

            destination: { latitude: 0, longitude: 0 },
            origin: { latitude: 0, longitude: 0 },
            duration: null,
            location: null,
            origem: "",
            short_origin: null,
            destino: "",
            short_destination: null,
            search_adress: false,
            run_wait_checkin: 0,
            buttonAddress: 0,
            run_status: 3,
            run_started: false,
          });

          toastError(
            "Corrida cancelada.\n Motivo: " + responseData.cancel_explanation === null ? "Não definido" : responseData.cancel_explanation
          );

          console.log(
            "Corrida cancelada. Motivo: " + responseData.cancel_explanation
          );
        }
      })
      .catch(function (error) {
        console.log("Deu ruim:" + error);
      });
  };

  create_run = async () => {
    if (this.state.cancel_timer === 1) {
      this.setState({ cancel_timer: 0 });
    }

    console.log("Timer " + this.state.cancel_timer);

    const token = this.props.token;

   // const url = "https://siga.aparecida.go.gov.br";

    fetch(
      URL +
        "/runs/user_create.json?run[origin_lat]=" +
        this.state.origin.latitude +
        "&run[origin_lng]=" +
        this.state.origin.longitude +
        "&run[origin_address]=" +
        this.state.origem +
        "&run[run_type]=run&run[request_reason_id]=3&run[destination_lat]=" +
        this.state.destination.latitude +
        "&run[destination_lng]=" +
        this.state.destination.longitude +
        "&run[destination_address]=" +
        this.state.destino,
      {
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json", // This is set on request
          "Content-Type": "application/json",
          Cookie: token,
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ id_run: responseJson.id });
        // console.log('ID -> ', responseJson.id)
      })
      .catch((error) => {
        console.log("Não há motoristas disponíveis!");
      });
  };

  verifica_date = () => {
    var hours = new Date().getHours();
    var result = 0;

    if (hours >= 12 && hours < 18) {
      result = 1;
    }

    if (hours >= 18) {
      result = 2;
    }

    return result;
  };

  getFirstName = () => {
    var name = this.props.name;
    return name.substring(0, name.indexOf(" "));
    //console.log("-> "+name.indexOf(' '));
  };

  getFirstNameDriver = () => {
    var name = this.state.driver.name;
    return name.substring(0, name.indexOf(" "));
    //console.log("-> "+name.indexOf(' '));
  };

  details = () => {
    return (
      <Container>
        <Back onPress={this.handleBack}>
          <Icon
            name="arrow-back"
            size={40}
            color="#3CB371"
            onPress={() =>
              this.setState({
                duration: 0,
                destination: null,
                short_destination: null,
              })
            }
          />
        </Back>

        <LocationBoxRun>
          <LocationTimeBoxRun>
            <LocationTimeTextRun>ORIGEM</LocationTimeTextRun>
            <LocationTimeTextSmallRun>
              {this.state.origem}
            </LocationTimeTextSmallRun>
          </LocationTimeBoxRun>
        </LocationBoxRun>

        <LocationBoxRun>
          <LocationTimeBoxRun>
            <LocationTimeTextRun>DESTINO</LocationTimeTextRun>
            <LocationTimeTextSmallRun>
              {this.state.destino}
            </LocationTimeTextSmallRun>
          </LocationTimeBoxRun>
        </LocationBoxRun>

        <RequestButton onPress={() => console.log("Teste")}>
          <RequestButtonText>SOLICITAR MOTORISTA</RequestButtonText>
        </RequestButton>
      </Container>
    );
  };

  /* Método responsável pelas mensagens de boas vindas*/

  welcome_msgs = () => {
    if (this.state.duration > 0) {
      this.setState({
        welcome_msg: "Tudo certo! Pode Puxe aqui para chamar um motorista!",
      });
    }
    if (this.state.duration < 0 && this.state.destination.latitude != 0) {
      this.setState({ welcome_msg: "Tudo certo! Agora defina o seu destino!" });
    }

    if (this.state.duration === 0) {
      this.setState({
        welcome_msg: "Olá " + this.getFirstName() + "! Onde precisa ir?",
      });
    }
  };

  renderContent2 = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>

      <TouchableHighlight
        onPress={() => {
          console.log("asdasd");
        }}
      >
        <Text>Abrir</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => {
          this.sheetRef.current.snapTo(1);
        }}
      >
        <Text>Fechar</Text>
      </TouchableHighlight>
    </View>
  );

  usermsg = () => {
    if (!this.state.openBottomDrawer) {
      toastSucess("Puxe para cima para expandir!");
      console.log("Puxe para cima para expandir!");
    } else {
      console.log("Puxe para baixo para fechar!");
      toastSucess("Puxe para baixo para fechar!");
    }
  };

  reloadMap = (menuDmension) => {
    console.log("Aqui");
    this.sheetRef.current.snapTo(menuDmension);
    this.mapView.animateToRegion(this.state.region, 1000);
  };

  renderContent = () => {
    return (
      <SafeAreaView style={{ backgroundColor: "#307597" }}>
        {/*<View style={{ backgroundColor: "#307597", alignContent: "center" }}> */}
        {Platform.OS === "android" ? (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              !this.state.openBottomDrawer
                ? this.sheetRef.current.snapTo(0)
                : this.sheetRef.current.snapTo(2);
            }}
          >
            <Icon
              name={
                !this.state.openBottomDrawer
                  ? "keyboard-arrow-up"
                  : "keyboard-arrow-down"
              }
              onPress={() => {
                !this.state.openBottomDrawer
                  ? this.sheetRef.current.snapTo(0)
                  : this.sheetRef.current.snapTo(2);
              }}
              size={40}
              color="#FFF"
              style={{
                top: normalize(10),
                left: -5,
                bottom: 5,
                position: "relative",
                alignSelf: "center",
              }}
            />
          </TouchableHighlight>
        ) : (
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => {
              !this.state.openBottomDrawer
                ? this.reloadMap(0)
                : this.reloadMap(2);
            }}
          >
            <Icon
              name={
                !this.state.openBottomDrawer
                  ? "keyboard-arrow-up"
                  : "keyboard-arrow-down"
              }
              onPress={() => {
                !this.state.openBottomDrawer
                  ? this.sheetRef.current.snapTo(0)
                  : this.sheetRef.current.snapTo(2);
              }}
              size={40}
              color="#FFF"
              style={{
                // left: 165,
                marginTop: normalize(5),
                //top: 5,

                position: "relative",
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        )}

        {this.state.show_welcome_msg ? (
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: normalize(10),
              top: normalize(-10),
              textAlign: "center",
              position: "relative",
            }}
          >
            {this.state.welcome_msg}
          </Text>
        ) : (
          <Text
            style={{
              color: "#dcd074",
              fontSize: 18,
              fontWeight: "bold",
              top: normalize(10),
              alignSelf: "center",
              position: "relative",
            }}
          >
            Origem
          </Text>
        )}

        <TextInput
          value={"" + this.state.origem}
          onTouchStart={() => this.googleSearch(0)}
          placeholderTextColor="#307597"
          backgroundColor="#FFF"
          style={{
            fontSize: 18,
            height: 48,
            color: "#3CB371",
            paddingLeft: 55,
            borderRadius: 15,
            width: "100%",
            top: normalize(this.state.top_origin_textinput),
            left: 5,
          }}
          placeholder="Digite o endereço"
          selection={{ start: 0, end: 0 }}
        />

        <Image
          source={require("../../images/pin_origem02.png")}
          style={{
            resizeMode: "cover",

            height: 45,

            width: 40,
            top: normalize(Platform.OS === "ios" ? -15 : -15),
            left: normalize(Platform.OS === "ios" ? 10 : 10),
            position: "relative",
          }}
        />

        {/* 

        <Button
          style={{
            //top: normalize(Platform.OS === "ios" ? 65 : 65),
            borderRadius: 0,
            width: "26%",
            height: normalize(Platform.OS === "ios" ? 38 : 50, "height"),
            position: "absolute",

            marginLeft: normalize(275),
            
          }}
        >
          <ButtonText
            style={{ color: "#307597", textAlign: "center", bottom: 5 }}
          >
            Alterar
          </ButtonText>
        </Button>

*/}

        <Text
          style={{
            color: "#dcd074",
            fontSize: 18,
            fontWeight: "bold",
            top: this.state.top_destination_label,

            alignSelf: "center",
          }}
        >
          Destino
        </Text>

        <TextInput
          value={"" + this.state.destino}
          onTouchStart={() => this.googleSearch(1)}
          placeholderTextColor="#307597"
          backgroundColor="#FFF"
          style={{
            fontSize: 18,
            height: 50,
            color: "#3CB371",
            paddingLeft: 55,
            borderRadius: 15,
            width: "100%",
            bottom: 10,
            marginTop: 10,
            // top: this.state.top_destination_textinput,
            left: 5,
          }}
          placeholder="Digite o endereço"
          selection={{ start: 0, end: 0 }}
        />
        <Image
          source={require("../../images/pin_destino02.png")}
          style={{
            resizeMode: "cover",
            height: 45,
            width: 40,

            position: Platform.OS === "ios" ? "relative" : "absolute",
            top: normalize(Platform.OS === "ios" ? -50 : 195),
            left: normalize(Platform.OS === "ios" ? 10 : 10),
          }}
        />
        {/*
        <Button
          style={{
            top: normalize(Platform.OS === "ios" ? 127 : 155),
            position: "absolute",
            borderRadius: 0,
            width: "25%",
            height: normalize(Platform.OS === "ios" ? 38 : 55, "height"),
            marginLeft: normalize(275),
          }}
        >
          <ButtonText
            style={{
              color: "#307597",
              textAlign: "center",
              bottom: Platform.OS === "ios" ? 5 : 5,
            }}
          >
            Alterar
          </ButtonText>
        </Button>

*/}

        <Text
          style={{
            color: "#FFF",
            fontSize: 16,
            fontWeight: "bold",
            marginTop: normalize(Platform.OS === "ios" ? -10 : 30),
            left: -10,
            bottom: 15,
            alignSelf: "center",
          }}
        >
          {this.state.run_wait_checkin === 0
            ? this.getDurationMsgs(0)
            : this.getDurationMsgs(1)}

          {this.state.msg_duration}
        </Text>

        {this.getButtonPlatform()}

        {/*this.state.duration > 0 &&
        this.state.run_wait_checkin === 0 &&
        this.state.run_started === false &&
        Platform.OS === "ios" ? (
          <Button
            onPress={() => {
              this.timer();
            }}
            style={{
              borderRadius: 0,
              width: "100%",
              marginLeft: -10,
              bottom: normalize(30),
            }}
          >
            <ButtonText
              
              style={{ color: "#307597", fontSize: 18 }}
            >
              CHAMAR CARRO
            </ButtonText>
          </Button>
        ) : (
          
          <Button
            style={{
              borderRadius: 0,
              width: "100%",
              marginLeft: -10,
              bottom: normalize(30),
            }}
            onPress={() => {
              this.showDriverData();
            }}
          >
            <ButtonText style={{ color: "#307597", fontSize: 18 }}>
              INFO
            </ButtonText>
          </Button>
          )*/}

        {/*Código Plataforma IOS */}

        {/*

         (
<TouchableHighlight  underlayColor="transparent" onPress={() => {
                  this.timer();
                }}>
          <Button
            style={{
              marginTop: 30,
              borderRadius: 0,
              width: "100%",
            marginLeft: -10,
             
            }}
          >
            {this.state.run_wait_checkin === 0 &&
            this.state.run_started === false ? (
              <ButtonText
                onPress={() => {
                  this.timer();
                }}
                style={{ color: "#307597", fontSize: 18 }}
              >
                CHAMAR CARRO2
              </ButtonText>
            ) : (
              <ButtonText
                onPress={() => {
                  this.showDriverData();
                }}
                style={{ color: "#307597", fontSize: 18 }}
              >
                INFO
              </ButtonText>
            )}
          </Button> 

          </TouchableHighlight> 
          


         )
         
              */}

        {/*Platform.OS ==="android" ? 


<TouchableHighlight underlayColor="transparent" onPress={() => {
                  toastSucess("Vc precisa definir o destino primeiro!");
                }}> 

              <Button
             
            style={{
              marginTop: 30,
              borderRadius: 0,
              width: "100%",
              marginLeft: -5,
              
            }}
          
          >
            <ButtonText
          onPress={() => {
            toastSucess("Vc precisa definir o destino primeiro!");
          }}
          style={{ color: "#307597", fontSize: 18 }}
        >
          CHAMAR CARRO
        </ButtonText></Button>

        </TouchableHighlight>

              : 
              <TouchableOpacity>
              
              <Button
             
            style={{
              marginTop: 30,
              borderRadius: 0,
              width: "100%",
              marginLeft: -5,
              
            }}
          
          >
            <ButtonText
          onPress={() => {
            toastSucess("Vc precisa definir o destino primeiro!");
          }}
          style={{ color: "#307597", fontSize: 18 }}
        >
          CHAMAR CARRO
        </ButtonText></Button>
              
              </TouchableOpacity>
        */}

        {/* 
        <View style={styles.buttonContainerOrigem}>
          
        <Text
            style={{
              color: "#dcd074",
              fontSize: 18,
              fontWeight: "bold",
              top: -285,
              
            }}
          >
            Destino
          </Text>
          <Search
              onLocationOriginSelected={this.handleLocationOrigSelected}
              placeholder={"De onde?"}
              type={1}
              icon={this.closeSearchGoogle}
            />
        
        </View> */}
        {/*this.verifica_date() === 0 ? (
          <Text
            style={{
              color: " #dcd074",
              fontSize: 18,
              fontWeight: "bold",
              bottom: 20,
            }}
          >
            Bom dia, {this.getFirstName()} {this.state.duration}
          </Text>
        ) : this.verifica_date() === 1 ? (
          <Text
            style={{
              color: "#dcd074",
              fontSize: 18,
              fontWeight: "bold",
              bottom: 20,
            }}
          >
            Boa tarde, {this.getFirstName()}  {this.state.duration}
          </Text>
        ) : this.verifica_date() === 2 ? (
          <Text
            style={{
              color: "#dcd074",
              fontSize: 18,
              fontWeight: "bold",
              bottom: 20,
            }}
          >
            Boa noite, {this.getFirstName()}
          </Text>
        ) : (
          <Text
            style={{
              color: " #dcd074",
              fontSize: 18,
              fontWeight: "bold",
              bottom: 20,
            }}
          >
            {" "}
          </Text>
          )*/}

        {/* 
        <View style={styles.buttonContainerOrigem}>
          <ImageBackground
            source={require("../../images/botao_origem.png")}
            style={{
              resizeMode: "cover",
              justifyContent: "center",
              height: 70,
              top: -30,
              width: 330,
            }}
          >
          

            <TextInput
              value={"" + this.state.origem}
              onTouchStart={() => this.googleSearch(0)}
              placeholderTextColor="#808080"
              style={{
                height: 40,
                paddingLeft: 70,
                borderRadius: 15,
                width: 300,
                bottom: 5,
              }}
              placeholder="De onde?"
              selection={{ start: 0, end: 0 }}
            />
          </ImageBackground>
        </View>

        <View style={styles.buttonContainerOrigem}>
          <ImageBackground
            source={require("../../images/botao_destino.png")}
            style={{
              resizeMode: "cover",
              justifyContent: "center",
              height: 70,
              bottom: 25,
              width: 330,
            }}
          >
            <TextInput
              placeholderTextColor="#808080"
              value={"" + this.state.destino}
              onTouchStart={() => this.googleSearch(1)}
              style={{
                height: 40,
                paddingLeft: 70,
                borderRadius: 15,
                width: 300,
                bottom: 0,
              }}
              placeholder="Para onde?"
              selection={{ start: 0, end: 0 }}
            />
          </ImageBackground>
        
        </View> 
      </View>*/}
      </SafeAreaView>
    );
  };

  async componentDidMount() {
    const welcome_msg = "Olá " + this.getFirstName() + "! Onde precisa ir?";
    this.setState({ welcome_msg: welcome_msg });

    if (Platform.OS === "ios") {
      console.log("IOS");
      this.setState({ platform: 0 });
    } else {
      console.log("Android");
      this.setState({ platform: 1 });
    }

    //this.deleteDataRun();

    // this.storeDataRun();
    this.getDataSync();

    //const {id}   = this.getDataSync();

    //this._getLocationAsync();

    /*
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(","));

        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
        });
        this.getAddress(this.state.region);
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );*/
    const { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (this.state.origin.latitude === 0) {
            this.setState({
              region: {
                latitude,
                longitude,
                latitudeDelta: 0.0143,
                longitudeDelta: 0.0134,
              },
              origin: {
                latitude,
                longitude,
                latitudeDelta: 0.0143,
                longitudeDelta: 0.0134,
              },
            });
            this.getAddress(this.state.origin);
          } else {
            this.setState({
              region: {
                latitude,
                longitude,
                latitudeDelta: 0.0143,
                longitudeDelta: 0.0134,
              },
            });
          }

          // this.getAddress(this.state.region);

          console.log(" Coordenadas: " + position.coords.latitude);
          /*
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        }); */
        },
        (error) => {
          console.log(error);
          toastError("A permissão da localização deve ser concedida.");
        },

        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10,
        }
      );
    } else {
      toastError("A permissão da localização deve ser concedida.");
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        latitudeDelta: 0.0491,
        longitudeDelta: 0.0375,

        title: data.structured_formatting.main_text,
      },

      destino: data.structured_formatting.secondary_text,
      short_destination: data.structured_formatting.main_text,
      search_adress: false,

      /* region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0491,
        longitudeDelta: 0.0375,
      },*/
    });

    this.mapView.animateToRegion(this.state.destination, 1000);
  };

  closeSearchGoogle = (status) => {
    this.setState({
      search_adress: false,
      top_destino: 20,
      top_origin: -30,
    });
  };

  handleLocationOrigSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;

    this.setState({
      origin: {
        latitude,
        longitude,
        latitudeDelta: 0.0491,
        longitudeDelta: 0.0375,
      },
      origem: data.structured_formatting.secondary_text,
      short_origin: data.structured_formatting.main_text,
      search_adress: false,

      /*region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0491,
        longitudeDelta: 0.0375,
      },*/
    });

    this.mapView.animateToRegion(this.state.origin, 1000);

    console.log(" Aqui " + data.structured_formatting.main_text);
  };

  handleBack = () => {
    this.setState({ duration: 0 });
  };

  addMarker(coordinates) {
    const coord = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,

      /*

      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,*/

      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    };

    this.getAddress(coord);
  }

  onRegionChangeComplete = () => {
    console.log("");

    //this.markerMotora.current.showCallout();
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      markerRef.current.showCallout();
    }

    // if(this.state.run_wait_checkin === 1){
    //  this.marker_motora.showCallout();
    // }
  };

  componentDidUpdate() {
    console.log("");

    if(this.state.platform === 0){
      this.mapView.animateToRegion(this.state.region, 1000);
    }

    //this.markerMotora.showCallout();
    //if (this.markerMotora) {
    console.log("asdasd");
    //  this.markerMotora.current.showCallout();
  }

  //if(this.state.run_wait_checkin === 1 ){
  //   this.marker_motora.showCallout();

  // }
  // }

  sheetRef = React.createRef();
  markerRef = React.createRef();

  render() {
    const { region, destination, location, duration, origin } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          region={
            (this.state.point,
            {
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            })
          }
          showsUserLocation={false}
          loadingEnabled={true}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
          ref={(el) => (this.mapView = el)}
          onPress={(event) => {
            if (this.state.run_wait_checkin === 0) {
              this.addMarker(event.nativeEvent.coordinate);
            }
          }}
        >
          <Marker coordinate={this.state.region} calloutVisible={true}>
            <Image
              style={{
                height: 80,
                width: 80,
                borderColor: "#000",
              }}
              source={require("../../images/user_marker.png")}
              ref={(_marker) => {
                this.markerRef = _marker;
              }}
            />
          </Marker>

          {this.state.run_wait_checkin === 1 ? (
            <Fragment>
              <Directions
                origin={this.state.driver_location}
                destination={this.state.origin}
                onReady={(result) => {
                  this.setState({ duration: Math.floor(result.duration) });

                  console.log("-> " + result.duration);

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350),
                    },
                  });
                }}
              />

              <MapView.Marker
                coordinate={{
                  latitude: this.state.driver_location.latitude,
                  longitude: this.state.driver_location.longitude,
                }}
              >
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    borderColor: "#000",
                    borderRadius: 40,
                  }}
                  source={{
                    uri: this.state.driver.profile_picture.thumb,
                  }}
                />

                <Callout
                  style={{ width: 175, borderRadius: 15 }}
                  tooltip={true}
                  onPress={() => {
                    this.timer();
                  }}
                >
                  <LocationBoxRun>
                    <LocationTimeBoxRun>
                      <LocationTextRun>
                        {this.state.driver.vehicle.model} |{" "}
                        {this.getFirstNameDriver()}
                      </LocationTextRun>

                      <LocationTimeTextSmallRun></LocationTimeTextSmallRun>
                    </LocationTimeBoxRun>
                    <LocationTextRun></LocationTextRun>
                  </LocationBoxRun>
                </Callout>
              </MapView.Marker>

              <MapView.Marker
                coordinate={{
                  latitude: this.state.origin.latitude,
                  longitude: this.state.origin.longitude,
                }}
                image={markerImage}
              >
                <Image
                  source={require("../../images/pin_origem.png")}
                  style={{ height: 60, width: 45 }}
                />
              </MapView.Marker>

              {/* <Marker coordinate={destination} anchor={{ x: 0, y: 0 }}>
                <Image
                  source={require("../../images/pin_destino.png")}
                  style={{ height: 60, width: 45 }}
                />
              </Marker> */}
            </Fragment>
          ) : null}

          {this.state.origin != null ? (
            <MapView.Marker
              coordinate={{
                latitude: this.state.origin.latitude,
                longitude: this.state.origin.longitude,
              }}
              image={markerImage}
              ref={(_marker) => {
                this.marker = _marker;
              }}
            >
              <Image
                source={require("../../images/pin_origem.png")}
                style={{ height: 60, width: 45 }}
              />
            </MapView.Marker>
          ) : null}

          {this.state.destination != null ? (
            <MapView.Marker
              coordinate={{
                latitude: this.state.destination.latitude,
                longitude: this.state.destination.longitude,
              }}
              image={markerImage}
              ref={(_marker) => {
                this.marker = _marker;
              }}
            >
              <Image
                source={require("../../images/pin_destino.png")}
                style={{ height: 60, width: 45 }}
              />
            </MapView.Marker>
          ) : null}

          {this.state.run_status === 2 &&
          this.state.show_route_origin_destination === false ? (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={(result) => {
                  this.setState({ duration: Math.floor(result.duration) });

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350),
                    },
                  });
                }}
              />
            </Fragment>
          ) : null}

          {/*this.state.run_wait_checkin === 0 && this.state.run_status === 1  ? (*/}
          {this.state.show_route_origin_destination ? (
            <Fragment>
              <Directions
                origin={origin}
                destination={destination}
                onReady={(result) => {
                  this.setState({ duration: Math.floor(result.duration) });

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350),
                    },
                  });
                }}
              />

              <MapView.Marker
                coordinate={{
                  latitude: this.state.origin.latitude,
                  longitude: this.state.origin.longitude,
                }}
                image={markerImage}
              >
                <Image
                  source={require("../../images/pin_origem.png")}
                  style={{ height: 60, width: 45 }}
                />
              </MapView.Marker>

              <MapView.Marker
                coordinate={destination}
                ref={(_marker) => {
                  this.marker = _marker;
                }}
                title={""}
              >
                <Image
                  source={require("../../images/pin_destino.png")}
                  style={{ height: 60, width: 45 }}
                />
              </MapView.Marker>
            </Fragment>
          ) : null}

          {/* && this.state.run_wait_checkin === 0 

          {destination && this.state.run_started != false ? (
            <Fragment>
              <Directions
                origin={this.state.origin}
                destination={destination}
                onReady={(result) => {
                  this.setState({ duration: Math.floor(result.duration) });

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350),
                    },
                  });
                }}
              />
             
            </Fragment>
          ):(

            <Fragment>
            <Directions
              origin={this.state.region}
              destination={destination}
              onReady={(result) => {
                this.setState({ duration: Math.floor(result.duration) });

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: getPixelSize(50),
                    left: getPixelSize(50),
                    top: getPixelSize(50),
                    bottom: getPixelSize(350),
                  },
                });
              }}
            />
           
          </Fragment>

          )} */}
        </MapView>

        {/*Alterar as cores dos ícones para #B2BF86 quando for publicar o app */}
        <IconButton
          icon="menu"
          color="#307597"
          animated={true}
          size={40}
          style={{
            top: 10,
            left: 10,
            backgroundColor: "#B2BF86",
            position: "absolute",
          }}
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }
        />

        <IconButton
          icon="crosshairs-gps"
          color="#307597"
          animated={true}
          size={40}
          style={{
            top: 10,
            right: 10,
            backgroundColor: "#B2BF86",
            position: "absolute",
          }}
          onPress={() => this.mapView.animateToRegion(this.state.region, 1000)}
        />

        {/** Modal apresentado quando a corrida é aceita pelo motorista */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_run_accept}
        >
          <ImageBackground
            source={require("../../images/image_fundo.png")}
            style={{
              alignContent: "center",
              alignItems: "center",
              flex: 1,
              resizeMode: "cover",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 30,
                marginBottom: 10,
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              CORRIDA ACEITA
            </Text>
            <Text
              style={{
                color: "#FFF",
                fontSize: 25,
                marginBottom: 10,
                fontWeight: "bold",
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                alignSelf: "center",
              }}
            >
              Se dirija ao ponto de origem da corrida.
            </Text>

            <Image
              source={require("../../images/icon_ok.png")}
              style={{ width: 150, height: 125, marginTop: 70 }}
            />
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_run_started}
        >
          <ImageBackground
            source={require("../../images/image_fundo.png")}
            style={{
              alignContent: "center",
              alignItems: "center",
              flex: 1,
              resizeMode: "cover",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 30, marginBottom: 10 }}>
              CORRIDA INICIADA
            </Text>

            <Image
              source={require("../../images/icon_ok.png")}
              style={{ width: 150, height: 125, marginTop: 70 }}
            />
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_run_finish}
        >
          <ImageBackground
            source={require("../../images/image_fundo.png")}
            style={{
              alignContent: "center",
              alignItems: "center",
              flex: 1,
              resizeMode: "cover",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 30, marginBottom: 30 }}>
              CORRIDA FINALIZADA
            </Text>

            <Image
              source={require("../../images/icon_ok.png")}
              style={{ width: 150, height: 125, marginTop: 70 }}
            />
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_run_cancel}
        >
          <ImageBackground
            source={require("../../images/image_fundo.png")}
            style={{
              alignContent: "center",
              alignItems: "center",
              flex: 1,
              resizeMode: "cover",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 30, marginBottom: 30 }}>
              CORRIDA CANCELADA
            </Text>

            <Image
              source={require("../../images/icon_cancel.png")}
              style={{ width: 120, height: 120, marginTop: 70 }}
            />
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.search_adress}
        >
          <View style={{ backgroundColor: "#307597", flex: 1 }}>
            {this.state.buttonAddress === 0 ? (
              <Search
                onLocationOriginSelected={this.handleLocationOrigSelected}
                placeholder={"Digite o endereço"}
                type={0}
                icon={this.closeSearchGoogle}
              />
            ) : (
              <Search
                onLocationSelected={this.handleLocationSelected}
                placeholder={"Digite o endereço"}
                type={1}
                icon={this.closeSearchGoogle}
              />
            )}
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.timer}
        >
          <View style={styles.containertimer}>
            <Image
              source={require("../../assets/logomarca_rodape.png")}
              style={{
                width: Platform.OS === "ios" ? 260 : 220,
                height: Platform.OS === "ios" ? 95 : 75,
                borderWidth: 10,
                top: -100,
              }}
            />
            <Text style={styles.timerText1}>
              SUA SOLICITAÇÃO FOI REALIZADA.
            </Text>

            <Text style={{ color: "#FFF", fontSize: 18, top: -50 }}>
              {" "}
              Aguarde a confirmação do motorista.
            </Text>

            <Text style={styles.timerText}>{this.state.secs} segundos</Text>

            <Button
              style={{ top: 120, backgroundColor: "#D9D919" }}
              onPress={() => {
                this.cancel_run();
              }}
            >
              <ButtonText>CANCELAR</ButtonText>
            </Button>
          </View>
        </Modal>
        {/*
        <BottomDrawer
          containerHeight={this.state.full_dim}
          onExpanded={this.openBottomDrawer}
          onCollapsed={this.closeBottomDrawer}
          downDisplay={240}
          startUp={false}
          offset={-15}
        >
          {this.renderContent()}
        </BottomDrawer> */}

        <BottomSheet
          ref={this.sheetRef}
          snapPoints={[410, 295, 130]}
          borderRadius={10}
          scrollEnabled={false}
          enabledInnerScrolling={false}
          onOpenStart={this.openBottomDrawer}
          onCloseStart={this.closeBottomDrawer}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          initialSnap={2}
        />
      </View>
    );
  }

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  openBottomDrawer = () => {
    console.log("Abriu!!");

    this.setState({
      show_welcome_msg: false,
      openBottomDrawer: true,
      full_dim: 325,
    });

    if (
      this.state.origin.latitude != 0 &&
      this.state.destination.latitude === 0
    ) {
      this.setState({ welcome_msg: "Ok! Agora basta definir o seu destino!" });
    }

    {
      /*  if (
      this.state.origin.latitude != 0 &&
      this.state.destination.latitude != 0
    ) {
      this.setState({
        top_origin_label: 25,
        top_origin_textinput: 65,
        top_origin_icon: 45,
        button_alter_address_origin: 30,

        top_destination_label: 30,
        top_destination_textinput: 70,
        top_destination_icon: 55,
        button_alter_address_destination: 38, 
      });
    } */
    }
  };
  closeBottomDrawer = () => {
    console.log("Fechou!!");

    this.setState({
      show_welcome_msg: true,
      openBottomDrawer: false,
      // welcome_msg_top: 75,
    });

    if (this.state.destination.latitude != 0) {
      this.setState({
        welcome_msg: "Puxe aqui para solicitar a corrida.",

        //  top_origin_textinput: 195,
        //  top_origin_icon: 190,
        // button_alter_address_origin: 125,
      });
    }
  };
}

const mapStateToProps = (state) => {
  return {
    name: state.AuthenticationReducer.name,
    avatar: state.AuthenticationReducer.avatar,
    token: state.AuthenticationReducer.token,
  };
};

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  logo: {
    marginTop: -730,
    marginBottom: 750,
    marginLeft: 300,

    flexDirection: "row",
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  positonBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    opacity: 0.75,
    marginTop: -170,
    marginHorizontal: 40,
    padding: 25,
    shadowColor: "#000",
    elevation: 5,
  },
  positonBoxTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  positonBoxLatLon: { flexDirection: "row", justifyContent: "space-between" },
  locationButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 150,
    marginTop: -25,
    width: 50,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    elevation: 8,
  },

  contentContainer: {
    backgroundColor: "#307597",
    flex: 1,

    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonContainerOrigem: {
    flexDirection: "row",
    borderRadius: 15,
    top: 5,
  },
  buttonContainerDestiny: {
    flexDirection: "row",
  },
  text: {
    paddingHorizontal: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  containertimer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },

  button: {
    width: 350,
    height: 100,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 45,
    color: "#B9AAFF",
  },
  timerText1: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
    top: -70,
  },
  timerText: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
    top: 40,
  },
  buttonReset: {
    marginTop: 20,
    borderColor: "#FF851B",
  },
  buttonTextReset: {
    color: "#FF851B",
  },

  header: {
    backgroundColor: "#f7f5eee8",
    opacity: 0.7,
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
});
