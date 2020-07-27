import React, { Component, Fragment } from "react";
import { View, Image, Text, ImageBackground, Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";

import Icon from 'react-native-vector-icons/MaterialIcons';

const GOOGLE_MAPS_APIKEY = 'AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860'; 

import Geolocation from 'react-native-geolocation-service';

import { getPixelSize } from "../../utils";

import Search from "../Search";
import Directions from "../Directions";
import Details from "../Details";

import BottomDrawer from 'rn-bottom-drawer';

const TAB_BAR_HEIGHT = 0;

import markerImage from "../../assets/marker.png";
import backImage from "../../assets/back.png";

import Drawer from 'react-native-circle-drawer';



import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Logo,
} from "./styles";

Geocoder.init("AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860");

console.disableYellowBox = true;

export default class Map extends Component {
  state = {
    region:  {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    },
    destination: { latitude: 0, longitude: 0 },
    origin: { latitude: 0, longitude: 0 },
    duration: null,
    location: null
  };

  renderContent = () => {
    return (
      <View>
        <Search onLocationOriginSelected={this.handleLocationOrigSelected} placeholder={"Origem?"} type={0} /> 
       
           <Search onLocationSelected={this.handleLocationSelected} placeholder={"Destino?"} type={1} /> 
         
      </View>
    )
  }


  async componentDidMount() {

  /*  Geolocation.getCurrentPosition(
      (position) => {
          let newOrigin = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0491,
              longitudeDelta: 0.0375
          };
         
  
          console.log('new origin');
          console.log(newOrigin);
  
          this.setState({
              region: newOrigin,
              destination: null
          });
      },
      (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  ); */


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
            longitudeDelta: 0.0134
          }
        });
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    ); 

    console.log("Teste!");

  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;

    this.setState({
      
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });

    console.log("Teste!");
  };

  handleLocationOrigSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;

    this.setState({
      origin: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });




  };

  handleBack = () => {
    this.setState({ destination: null, duration: 0 });
  };

  render() {
    const { region, destination, duration, location, origin } = this.state;

    return (
      
      <View style={{ flex: 1 }}>
 
        
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          loadingEnabled
          
          ref={el => (this.mapView = el)}
        >
          
          {destination && (
            <Fragment>
              <Directions
                origin={origin}
                destination={destination}
                onReady={result => {
                  this.setState({ duration: Math.floor(result.duration) });

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350)
                    }
                  });
                }}
              />
              <Marker
                coordinate={origin}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
              >
                <LocationBox>
                  <LocationText>{origin.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker coordinate={destination} anchor={{ x: 0, y: 0 }} image={markerImage}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                   <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>


          )}
        </MapView>

        <View style={styles.logo}>
      
      </View>


        { duration > 0 ? (
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>
            
           
            <Details duration={duration} /> 

          </Fragment>
        ) : ( 
          <>
          
           {/* 
            <Search onLocationOriginSelected={this.handleLocationOrigSelected} placeholder={"Origem?"} type={0} /> 
           <Search  onLocationSelected={this.handleLocationSelected} placeholder={"Destino?"} type={1} /> 
         
*/}
         


          </>
        )}

 
<BottomDrawer
        containerHeight={250}
        offset={TAB_BAR_HEIGHT}
      >
        {this.renderContent()}
  </BottomDrawer >

      </View>

      
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
    flex: 1
  },
  logo: {
    
    
    marginTop: -730,
 marginBottom: 750,
 marginLeft: 300,
    
    flexDirection: 'row',
    
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  positonBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    opacity: 0.75,
    marginTop: -170,
    marginHorizontal: 40,
    padding: 25,
    shadowColor: '#000',
    elevation: 5,
  },
  positonBoxTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  positonBoxLatLon: {flexDirection: 'row', justifyContent: 'space-between'},
  locationButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 150,
    marginTop: -25,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
});
