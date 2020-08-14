import React, { Component, Fragment } from "react";
import { View, AsyncStorage, Animated, Modal, Image, Text, Menu, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, TextInput } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

import { Avatar, IconButton,  Colors } from 'react-native-paper';


import Geocoder from "react-native-geocoding";

import Icon from 'react-native-vector-icons/MaterialIcons';

const GOOGLE_MAPS_APIKEY = 'AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860'; 

import Geolocation from 'react-native-geolocation-service';

import { getPixelSize } from "../../utils";

import Search from "../Search";
import Origin from "../Search/origin"

import SideMenu from 'react-native-side-menu';

import Directions from "../Directions";
import Details from "../Details";

import BottomDrawer from 'rn-bottom-drawer';

import 'react-native-gesture-handler';

import {MenuSiga } from '../Menu/index';

import uberx from "../../assets/uberx.png";




import api from '../../services/api';


const TAB_BAR_HEIGHT = 50;
const HEADER_HEIGHT = 0;

import markerImage from "../../assets/marker.png";
import backImage from "../../assets/back.png";

import DrawnerMenu from '../../drawner.js';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import {connect} from "react-redux";

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  RequestButton,
  LocationBoxRun,
  RequestButtonText,
  LocationTextRun,
  Logo,
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
} from "./styles";


Geocoder.init("AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860");

console.disableYellowBox = true;


import googlemaps from '../../services/api';




 class Map extends Component {

  static navigationOptions = {
    headerShown: false
  };


  state = {
    region:  {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    },
    place:'',

    buttonAddress: 0,

    markers: [
      { latitude: 0.001, longitude: 0.0 },
    ],

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
  };

   

  googleSearch(button) {


    console.log(button);

   

    this.setState({
      buttonAddress: button,
      startUp: false,
      search_adress: true,
      
      
  });


  

{/*     
if(button === 0){
  this.props.navigation.navigate('Search', {
    type: 0,
    onLocationOriginSelected: this.handleLocationOrigSelected,
    
  }); 
}else{
  this.props.navigation.navigate('Search', {
    type: 1,
    onLocationSelected: this.handleLocationSelected
    
  }); 
}

  
  */}
  
     
      
    }

    

getAddress = async (coordinate) => {
  const response = await api.post('/geocode/json?latlng='+coordinate.latitude+','+coordinate.longitude+'&key=AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860')
  .then(response =>{

console.log("-> "+response.data.results[0].formatted_address);


   if(this.state.buttonAddress === 0){
    this.setState({
      origem: response.data.results[0].formatted_address,
      origin: coordinate,
      short_origin: response.data.results[0].address_components[1].short_name,
     
  });
   } else{
    this.setState({
      destino: response.data.results[0].formatted_address,
      destination: coordinate,
      short_destination: response.data.results[0].address_components[1].short_name,
      
  });
   }

    

  
   
}).catch(
  function (error) {
    
    console.log("Ops! Login ou senha inválidos!");

   {/*
    Toast.show('Ops! Login ou senha inválidos!', Toast.SHORT, [
      'UIAlertController',
    ]);
   */} 
    //return Promise.reject(error)
  }
);
}


verifica_date = () =>{

  var hours = new Date().getHours();
    var result = 0;
    

  if(hours >= 12 && hours < 18){
    result = 1;
  }

  if(hours >= 18){
    result = 2;
  }


  return result;
};
  

getFirstName = () =>{
  var name = this.props.name;
  return name.substring(0,name.indexOf(' '));
  //console.log("-> "+name.indexOf(' '));
}

details = () =>{
  return (
    
    <Container>

<Back onPress={this.handleBack} >
          
          
          <Icon name="arrow-back" size={40} color="#3CB371"    onPress={ () =>   this.setState({ duration: 0, destination: null, short_destination: null }) }/>

           </Back>

            <TypeTitle>Siga</TypeTitle>
    
            <TypeImage source={uberx} /> 
            <TypeTitle>Tempo de viagem</TypeTitle>
        <TypeDescription>{this.state.duration} minutos</TypeDescription>
    
            <RequestButton onPress={() =>  console.log("Teste") }>
              <RequestButtonText>SOLICITAR MOTORISTA</RequestButtonText>
            </RequestButton>
            </Container>
        );
}

  renderContent = () => {

    

    return (

      


      <View style={styles.contentContainer } > 

<Icon name="swap-vert" size={40} color="#3CB371"  style={{ top: -5, left: 145}}  />
 

{ this.verifica_date() === 0 ? (
  
<Text  style={{ color: '#3CB371' ,  fontSize: 18,   fontWeight: "bold", bottom: 20 }}>Bom dia, {/*this.getFirstName() */}</Text>

 
  
) : ( this.verifica_date() === 1 ? (
  
  <Text style={{  color: '#3CB371' , fontSize: 18,   fontWeight: "bold", bottom: 20 }} >Boa tarde, {/*this.getFirstName() */}</Text>


): ( this.verifica_date() === 2 ? (

   <Text style={{  color: '#3CB371' , fontSize: 18,   fontWeight: "bold", bottom: 20 }} >Boa noite, {/*this.getFirstName() */}</Text>

): ( <Text style={{  color: '#3CB371' , fontSize: 18,   fontWeight: "bold", bottom: 20 }} > </Text> )))}


  
  


<Text style={{ color: '#808080', bottom: 15, borderWidth: 0.2, bottom: 30 }}   >______________________________________________________</Text>
  

  
       <View style={styles.buttonContainerOrigem } >
        <ImageBackground source={require('../../images/botao_origem.png')} style={{ resizeMode: "cover",
    justifyContent: "center", height: 70, top: -30, width:330 }} >
        
{/** onTouchStart={()=> this.onPress() } */
}

      <TextInput    value={""+this.state.origem}     onTouchStart={() => this.googleSearch(0)   }  placeholderTextColor = "#808080"  style={{     height: 40, paddingLeft: 70,   borderRadius: 15, width: 300, bottom: 5}} placeholder="De onde?"  selection={ { start: 0 , end: 0}}  />
      </ImageBackground>
      </View>


      <View style={styles.buttonContainerOrigem } >
      <ImageBackground source={require('../../images/botao_destino.png')} style={{ resizeMode: "cover",
    justifyContent: "center", height: 70, bottom: 25, width:330 }} >
        
      <TextInput   placeholderTextColor = "#808080"  value={""+this.state.destino} onTouchStart={()=> this.googleSearch(1) }   style={{    height: 40, paddingLeft: 70,   borderRadius: 15, width: 300, bottom: 0}} placeholder="Para onde?" selection={ { start: 0 , end: 0}}    />
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

     
    )
  }


  

  async componentDidMount() {

    
    const tokenExpo = await AsyncStorage.getItem('token');

    console.log("TOKEN: "+tokenExpo);
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
        this.getAddress(this.state.region);
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    ); 

   

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
      },

      destino: data.structured_formatting.secondary_text,
      short_destination: data.structured_formatting.main_text,
      search_adress: false,

      region: {latitude: latitude, longitude: longitude, latitudeDelta: 0.0491,
        longitudeDelta: 0.0375 }
      
      
    }); 
    
    
    
    

    this.mapView.animateToRegion(this.state.region, 1000);

    console.log(" Aqui2 "+latitude);
  };

  closeSearchGoogle = (status) =>{
    this.setState({  
      search_adress: false,
      top_destino: 20,
      top_origin: -30,
    });
     
  };



  handleLocationOrigSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
   
   
    

 this.setState({
      origin: {
        latitude,
        longitude
        
      },
      origem: data.structured_formatting.secondary_text,
      short_origin: data.structured_formatting.main_text,
      search_adress: false,

      region: {latitude: latitude, longitude: longitude, latitudeDelta: 0.0491,
        longitudeDelta: 0.0375 }
      
      
    }); 
    
    
    
    

    this.mapView.animateToRegion(this.state.region, 1000);

console.log(" Aqui "+data.structured_formatting.main_text);


  }




  handleBack = () => {
    
    this.setState({  duration: 0 }); 
    
  };

  addMarker(coordinates) {

    console.log("-> "+ coordinates.latitude+ " "+coordinates.longitude);


{/* ...this.state.markers,*/}

    this.setState({
      markers: [  { latitude: coordinates.latitude, longitude: coordinates.longitude }],
      region: {latitude: coordinates.latitude, longitude: coordinates.longitude, latitudeDelta: 0.0491,
        longitudeDelta: 0.0375 }
    });

    

    this.mapView.animateToRegion(this.state.region, 1000);



    this.getAddress(coordinates);


    
  }
  

  CustomMarker = () =>  {
  return(
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "#007bff",
        borderColor: "#eee",
        borderRadius: 5,
        elevation: 10
      }}
    >
      <Text style={{ color: "#fff" }}>Berlin</Text>
    </View>
  );
    }





  render() {
    const { region, destination, duration, location, origin } = this.state;

    
   

    return (
      

<View style={{ flex: 1 }}>
 

        <MapView 
        
          style={styles.map}
          region={region}
          showsUserLocation={false}
          loadingEnabled
          ref={el => (this.mapView = el)}
          
          onPress={event => {this.addMarker(event.nativeEvent.coordinate);
          
          }
          }
        
          
        >



<Marker
          coordinate={region}
          
         
          
        >
           <Image
        style={{ height: 40, width: 40, borderColor: '#000',   borderRadius: 40}}
        source={ {uri: this.props.avatar}}
      /> 
       

       


     {/* <Image source={require('../../images/asset_pin_origin.png')}  style={{height: 60, width: 45 }} /> */} 

</Marker>


<MapView.Overlay
        
          bounds={[[0.01, -0.01], [-0.01, 0.01]]}
        />
        { /*this.state.markers.map(marker =>
          (<MapView.Marker
            key={marker.index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          >
          { (this.state.buttonAddress === 0 ? ( <Image source={require('../../images/pin_origem.png')}  style={{height: 60, width: 45 }} />) :
           ( <Image source={require('../../images/pin_destino.png')}  style={{height: 60, width: 45 }} />)) }
         
          </MapView.Marker>
          )
          ) */}

          { this.state.origin != null ?
          (
            <MapView.Marker
           
            coordinate={{ latitude: this.state.origin.latitude, longitude: this.state.origin.longitude }}
          >
         <Image source={require('../../images/pin_origem.png')}  style={{height: 60, width: 45 }} />
         
         
         

         
          </MapView.Marker>
          ) : ""

          }

{ this.state.destination != null ?
          (
            

            <MapView.Marker
            
            coordinate={{ latitude: this.state.destination.latitude, longitude: this.state.destination.longitude }}
            
           
          >
         <Image source={require('../../images/pin_destino.png')}  style={{height: 60, width: 45 }} />
       
         
          </MapView.Marker>
         
    
   
          
          ) : ( 
            <MapView.Marker
           
            coordinate={{ latitude: this.state.origin.latitude, longitude: this.state.origin.longitude }}
          >
         <Image source={require('../../images/pin_origem.png')}  style={{height: 60, width: 45 }} />
         
         
         

         
          </MapView.Marker>

          )

          }

          
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
                  <LocationText>{this.state.short_origin}</LocationText>
                </LocationBox>
              </Marker>

             

              <Marker coordinate={destination} anchor={{ x: 0, y: 0 }} image={markerImage}>
             
             
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                    <LocationText>{this.state.short_destination}</LocationText> 
                
                </LocationBox>

             
                
              </Marker>

             

            </Fragment> 


          )}
        </MapView>

        
      
     


        { duration > 0 ? (
          
          <Fragment>

      
          
          {/* 
           
             <Details duration={duration} /> 
            {this.details()}

 */}
           
           

          {/*   <Modal
animationType="fade"
transparent={true}
visible={true}

> */}



{this.details()}


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
    style={{ top: -545, left: 5, backgroundColor: "#FFF"}}
    onPress={() =>  this.props.navigation.dispatch(DrawerActions.openDrawer())}
  />
   

<Modal
animationType="slide"
transparent={true}
visible={this.state.search_adress}

> 
  { this.state.buttonAddress === 0 ?
  
  (<Search onLocationOriginSelected={this.handleLocationOrigSelected} placeholder={"De onde?"} type={0} icon={this.closeSearchGoogle} /> ) :

  ( <Search  onLocationSelected={this.handleLocationSelected} placeholder={"Para onde?"} type={1} icon={this.closeSearchGoogle} />  ) 

  }

         

       </Modal>


<BottomDrawer
       containerHeight={this.state.dim}
       startUp={this.state.startUp}
       offset={0}
      
      >

        
       
        {this.renderContent()}
        
  </BottomDrawer > 


 
  
</View>  





    );
  }
}

const mapStateToProps = state => {
  return {
    //  user: state.AuthenticationReducer.user,
    //  hospitalPrincipal: 1,
    //  hospitalPrincipal: state.AuthenticationReducer.hospitalPrincipal,
   // login: state.AuthenticationReducer.login,
   name: state.AuthenticationReducer.name,
   avatar: state.AuthenticationReducer.avatar,
  }
};

export default connect(mapStateToProps)(Map);

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

  contentContainer: {
    flex: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-around'
    
  },
  buttonContainerOrigem: {
    flexDirection: 'row',
     borderRadius: 15,
     top: 5
    
  },
  buttonContainerDestiny: {
    flexDirection: 'row',
   
  },
  text: {
    paddingHorizontal: 5
  },


  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});
