import React, { Component, Fragment, useState, useEffect } from "react";
import {
  View,
  AsyncStorage,
  Animated,
  Platform,
  Modal,
  Image,
  Text,
  Menu,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  TextInput,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

import { Avatar, IconButton, Colors } from "react-native-paper";

import Geocoder from "react-native-geocoding";

//import Geolocation from 'react-native-geolocation-service';

import Icon from "react-native-vector-icons/MaterialIcons";

const GOOGLE_MAPS_APIKEY = "AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860";

import { getPixelSize } from "../../utils";

import Search from "../Search";
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

import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

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

const screen = Dimensions.get("window");

Geocoder.init("AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860");

console.disableYellowBox = true;

import Toast from "react-native-tiny-toast";

import googlemaps from "../../services/api";

import Timer from "./timer";

const {
  setIntervalAsync,
  clearIntervalAsync,
} = require("set-interval-async/dynamic");

/* Configuração do Toast*/

const toastError = (msg) =>
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
    coordinate: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    },
    place: "",

    buttonAddress: 0,

    markers: [{ latitude: 0.001, longitude: 0.0 }],

    destination: { latitude: 0, longitude: 0 },
    origin: { latitude: 0, longitude: 0 },
    duration: null,
    location: null,
    origem: null,
    short_origin: null,
    destino: "",
    short_destination: null,
    search_adress: false,
    startUp: true,
    dim: 250,
    top_origin: -30,
    top_destino: 25,
    marker: null,
    timer: false,
    secs: 0,
    cancel_timer: 0,
    id_run: null,
    run_status: 0 /* a corrida pode ter 4 estados. 
    1 - Aceita; 2 - Iniciada; 3 - Finalizada; 4 - Cancelada;
    */,

    /* modal de início da corrida */
    modal_run_started: false,
    modal_run_started_cont: 0,

    /*estado aguardando check-in*/
    run_wait_checkin: false,
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

  googleSearch(button) {
    console.log(button);

    this.setState({
      buttonAddress: button,
      startUp: false,
      search_adress: true,
    });
  }

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
            short_origin:
              response.data.results[0].address_components[1].short_name,
          });

          this.mapView.animateToRegion(this.state.origin, 1000);
        } else {
          this.setState({
            destino: response.data.results[0].formatted_address,
            destination: coordinate,
            short_destination:
              response.data.results[0].address_components[1].short_name,
          });
          this.mapView.animateToRegion(this.state.destination, 1000);
        }
      })
      .catch(function (error) {
        console.log("Ops! Login ou senha inválidos!");
      });
  };

  timer = async () => {
    //this.getDataRun();

    this.create_run();

    this.setState({ timer: true, secs: 45 });

    this.state.interval = setInterval(() => {
      if (this.state.secs === 0 || this.state.cancel_timer === 1) {
        console.log("parou!! ");
        clearInterval(this.state.interval);
        this.setState({ timer: false, cancel_timer: 0 });

        if (!this.state.id_run) {
          toastError(
            "Não há motoristas disponíveis! \nPor favor, tente novamente mais tarde!"
          );
          this.cancel_run();
        }
      }

      if (this.state.id_run != null) {
        this.getDataRun();
      }

      this.setState({ secs: this.state.secs - 1 });
    }, 1000);
  };

  renew_run = async () => {
    const url = "https://sigadev.aparecida.go.gov.br";

    const response = await fetch(
      url + "/runs/" + this.state.id_run + "/renew",
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
        toastSucess("Renovando corrida!");
        return responseData;
      })
      .catch(function (error) {
        console.log("Deu ruim:" + error);
      });
  };

  cancel_run = async () => {
    const token = this.props.token;

    console.log("Corrida: " + this.state.id_run);

    const url = "https://sigadev.aparecida.go.gov.br";

    const response = await fetch(
      url + "/runs/" + this.state.id_run + "/user_cancel",
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
      const url = "https://sigadev.aparecida.go.gov.br";

      const response = fetch(
        url + "/runs/" + this.state.id_run + ".json",

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
          const { driver } = responseData;

          console.log("Motorista-> " + driver.name);
          this.setState({driver: driver} );

          this.getDriverLocation();

          if (responseData.started_at != null) {
            console.log("Corrida iniciada!");
            if (this.state.modal_run_started_cont == 0) {
              this.setState({ run_started: true, modal_run_started: true });
            }
            this.setState({
              run_started: true,
              modal_run_started_cont: this.state.modal_run_started_cont + 1,
            });

            //deverá ser retirado...
            if (this.state.modal_run_started != false) {
              toastSucess("Corrida iniciada!");
            }

            if (this.state.modal_run_started_cont > 3) {
              this.setState({
                run_started: true,
                modal_run_started: false,
              });
            }
          }
          if (responseData.finished_at != null) {
            // toastSucess("Corrida finalizada!");

            this.setState({
              run_finished: true,
            });

            console.log("Corrida finalizada!");
            clearIntervalAsync(timer);
          }

          if (responseData.canceled_at != null) {
            toastError(
              "Corrida cancelada!\n\n Motivo: " +
                responseData.cancel_explanation
            );
            console.log(
              "Corrida cancelada!\n\n Motivo: " +
                responseData.cancel_explanation
            );
            clearIntervalAsync(timer);
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
    const url = "https://sigadev.aparecida.go.gov.br";
    const response = await fetch(
      url + "/runs/" + this.state.id_run + "/driver_location",

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
        const { lat, lng } = responseData;

        const  driver_location = {
          latitude: lat,
          longitude: lng,
        }

        this.setState({ driver_location: driver_location });

        
      })
      .catch(function (error) {
        console.log("Deu ruim:" + error);
      });
  };

  getDataRun = async () => {
    const token = this.props.token;
    const url = "https://sigadev.aparecida.go.gov.br";
    const response = await fetch(
      url + "/runs/" + this.state.id_run + ".json",

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
          this.setState({ timer: false, cancel_timer: 1 });

          this.status_check_run();
        }

        if (
          responseData.driver_has_canceled != null ||
          responseData.canceled_at != null
        ) {
          this.setState({ timer: false, cancel_timer: 1 });
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

    const url = "https://sigadev.aparecida.go.gov.br";

    fetch(
      url +
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

        {/*        <TypeTitle>Siga</TypeTitle>
    
   <TypeImage source={uberx} /> */}
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
        {/*  <TypeTitle>Origem</TypeTitle>
        <TypeDescription>{this.state.origem} </TypeDescription> 

            <TypeTitle>Destino</TypeTitle> 
        <TypeDescription>{this.state.destino}</TypeDescription>  */}

        <RequestButton onPress={() => console.log("Teste")}>
          <RequestButtonText>SOLICITAR MOTORISTA</RequestButtonText>
        </RequestButton>
      </Container>
    );
  };

  renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <Icon
          name="swap-vert"
          size={40}
          color="#3CB371"
          style={{ top: -5, left: 145 }}
        />

        {this.verifica_date() === 0 ? (
          <Text
            style={{
              color: "#3CB371",
              fontSize: 18,
              fontWeight: "bold",
              bottom: 20,
            }}
          >
            Bom dia, {this.getFirstName()}
          </Text>
        ) : this.verifica_date() === 1 ? (
          <Text
            style={{
              color: "#3CB371",
              fontSize: 18,
              fontWeight: "bold",
              bottom: 20,
            }}
          >
            Boa tarde, {this.getFirstName()}
          </Text>
        ) : this.verifica_date() === 2 ? (
          <Text
            style={{
              color: "#3CB371",
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
              color: "#3CB371",
              fontSize: 18,
              fontWeight: "bold",
              bottom: 20,
            }}
          >
            {" "}
          </Text>
        )}

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
            {/** onTouchStart={()=> this.onPress() } */}

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
          {/*    
 <TextInput  onTouchStart={()=> this.onPress() }  style={{ right: -160,    height: 50, paddingLeft: 10, borderColor: '#3CB371', borderWidth: 2, borderRadius: 15, width: 330, bottom: 50}} placeholder="De onde?"   />
           
 <TextInput  onTouchStart={()=> this.onPress() }  style={{  left: -168, height: 50, paddingLeft: 10,  borderColor: '#3CB371', borderWidth: 2, borderRadius: 15, width: 330, bottom: -5, }} placeholder="Para onde?"   />
 
      onTouchStart={()=> this.onPress() } */}

          {/*  
        <Image
        style={{ height: 75, width: 75, right: 90 }}
        source={require('../../images/ic_assent_origin.png')}
      /> 

<Image
        style={{ height: 75, width: 75, right: 0 }}
        source={require('../../images/ic_assent_destiny.png')}
      /> 
   

*/}
        </View>
      </View>
    );
  };

  async componentDidMount() {
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
    );
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

      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0491,
        longitudeDelta: 0.0375,
      },
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

      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0491,
        longitudeDelta: 0.0375,
      },
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
      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    };
    // coordinates.latitudeDelta = 0.0491;
    // coordinates.longitudeDelta = 0.0375;

    this.getAddress(coord);
  }

  onRegionChangeComplete = () => {
    if (
      this.marker &&
      marker.current &&
      this.state.marker.current.showCallout
    ) {
      this.state.marker.current.showCallout();
    }
  };

  componentDidUpdate() {
    this.marker.showCallout();
  }

  render() {
    const { region, destination, location, duration, origin } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation={false}
          loadingEnabled={true}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
          ref={(el) => (this.mapView = el)}
          onPress={(event) => {
            this.addMarker(event.nativeEvent.coordinate);
          }}
        >
          <Marker coordinate={region}>
            <Image
              style={{
                height: 40,
                width: 40,
                borderColor: "#000",
                borderRadius: 40,
              }}
              source={{ uri: this.props.avatar }}
            />
          </Marker>

          {/*

<MapView.Overlay
        
          bounds={[[0.01, -0.01], [-0.01, 0.01]]}
        />

       
        this.state.markers.map(marker =>
          (<MapView.Marker
            key={marker.index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          >
          { (this.state.buttonAddress === 0 ? ( <Image source={require('../../images/pin_origem.png')}  style={{height: 60, width: 45 }} />) :
           ( <Image source={require('../../images/pin_destino.png')}  style={{height: 60, width: 45 }} />)) }
         
          </MapView.Marker>
          )
          ) */}


{ this.state.driver != null ? (

<Marker coordinate={this.state.driver_location}>
            <Image
              style={{
                height: 40,
                width: 40,
                borderColor: "#000",
                borderRadius: 40,
              }}
              source={{ uri: 'https://sigadev.aparecida.go.gov.br/paperclip/drivers/profile_pictures/6360c9194603fc778d3f8b2dee130aa98d2eb31c/thumb.png?1599229147' }}
            />
          </Marker>

) : (
 null
 
)}


          {this.state.origin != null ? (
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
          ) : (
            ""
          )}

          {this.state.destination != null ? (
            <Fragment>
              <Directions
                origin={origin}
                destination={destination}
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
                coordinate={destination}
                ref={(_marker) => {
                  this.marker = _marker;
                }}
              >
                <Image
                  source={require("../../images/pin_destino.png")}
                  style={{ height: 60, width: 45 }}
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
                      <LocationTimeTextRun>
                        {this.state.duration}
                      </LocationTimeTextRun>
                      <LocationTimeTextSmallRun>MIN</LocationTimeTextSmallRun>
                    </LocationTimeBoxRun>
                    <LocationTextRun>CHAMAR CARRO</LocationTextRun>
                  </LocationBoxRun>
                </Callout>
              </MapView.Marker>
            </Fragment>
          ) : (
            {
              /*   <MapView.Marker
           
            coordinate={{ latitude: this.state.origin.latitude, longitude: this.state.origin.longitude }}
          >
         <Image source={require('../../images/pin_origem.png')}  style={{height: 60, width: 45 }} />
         
         

         
          </MapView.Marker>
*/
            }
          )}

          {destination && (
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
              {/*
              <Marker
                coordinate={origin}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
              >
                <LocationBox>
                  <LocationText>{this.state.short_origin}</LocationText>
                </LocationBox>
              </Marker>

             

              <Marker coordinate={destination} anchor={{ x: 0, y: 0 }}  
             
              >
                
                <Image source={require('../../images/pin_destino.png')}  style={{height: 60, width: 45 }} />

                <LocationBoxRun>
                
                <LocationTimeBoxRun>
                  <LocationTimeTextRun>{this.state.duration}</LocationTimeTextRun>
                  <LocationTimeTextSmallRun>MIN</LocationTimeTextSmallRun>
                </LocationTimeBoxRun>
                  <LocationTextRun>CHAMAR CARRO</LocationTextRun> 
              
              </LocationBoxRun>
             
             
                
              </Marker>   */}
            </Fragment>
          )}
        </MapView>

        {this.state.duration > 0 ? (
          <Fragment>
            {/*
           
             <Details duration={duration} /> 
            {this.details()}


           
           

<Modal
animationType="fade"
transparent={true}
visible={true}

> 




{this.details()}

</Modal> */}
          </Fragment>
        ) : (
          <>
            {/*   
         <Search onLocationOriginSelected={this.handleLocationOrigSelected} placeholder={"Origem?"} type={0} /> 
           
             <Search  onLocationSelected={this.handleLocationSelected} placeholder={"Destino?"} type={1} /> 
         

             <Icon name="menu" size={50} color="#3CB371" style={{ top: -450, left: 10}}  />
        
            */}
          </>
        )}
        {/* 
<View style={{ backgroundColor: "#FFF",  height: 50, width:50, top: -520, left: 10}}>
<Icon name="menu" size={40} color="#3CB371"  style={{ top: -520, left: 10}}  onPress={ () =>  this.props.navigation.dispatch(DrawerActions.openDrawer())} />
 
</View>


<TouchableHighlight 
        onPress={() =>  this.props.navigation.dispatch(DrawerActions.openDrawer())}
      >
<Avatar.Icon size={50} icon="menu" color="#3CB371"   style={{ top: -545, left: 15, backgroundColor: "#FFF",}}  />

</TouchableHighlight> */}

        <IconButton
          icon="menu"
          color="#3CB371"
          animated={true}
          size={40}
          style={{
            top: Platform.OS === "ios" ? -670 : -500,
            left: 10,
            backgroundColor: "#FFF",
          }}
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.search_adress}
        >
          {this.state.buttonAddress === 0 ? (
            <Search
              onLocationOriginSelected={this.handleLocationOrigSelected}
              placeholder={"De onde?"}
              type={0}
              icon={this.closeSearchGoogle}
            />
          ) : (
            <Search
              onLocationSelected={this.handleLocationSelected}
              placeholder={"Para onde?"}
              type={1}
              icon={this.closeSearchGoogle}
            />
          )}
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.timer}
        >
          <View style={styles.containertimer}>
            <Image
              source={require("../../assets/logoaparecida.png")}
              style={{
                width: Platform.OS === "ios" ? 220 : 220,
                height: Platform.OS === "ios" ? 75 : 75,
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
              style={{ top: 120 }}
              onPress={() => {
                this.cancel_run();
              }}
            >
              <ButtonText>CANCELAR</ButtonText>
            </Button>
          </View>
        </Modal>

        <BottomDrawer
          containerHeight={this.state.dim}
          startUp={this.state.startUp}
          offset={0}
        >
          {this.renderContent()}
        </BottomDrawer>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //  user: state.AuthenticationReducer.user,
    //  hospitalPrincipal: 1,
    //  hospitalPrincipal: state.AuthenticationReducer.hospitalPrincipal,
    // login: state.AuthenticationReducer.login,
    name: state.AuthenticationReducer.name,
    avatar: state.AuthenticationReducer.avatar,
    token: state.AuthenticationReducer.token,
  };
};

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
    flex: 1,
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
    flex: 1,
    borderRadius: 25,
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
});
