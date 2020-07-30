import React, { Component, Fragment } from "react";
import { View, Image, Text, Menu, ImageBackground, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";




import Geocoder from "react-native-geocoding";

import Icon from 'react-native-vector-icons/MaterialIcons';

const GOOGLE_MAPS_APIKEY = 'AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860'; 

import Geolocation from 'react-native-geolocation-service';

import { getPixelSize } from "../../utils";

import Search from "../Search";

import SideMenu from 'react-native-side-menu';

import Directions from "../Directions";
import Details from "../Details";

import BottomDrawer from 'rn-bottom-drawer';

import Divider from 'react-native-divider';

import {MenuSiga } from '../Menu/index';

import { useNavigation } from '@react-navigation/native';



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





import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Logo,
} from "./styles";
import { TextInput } from "react-native-gesture-handler";

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

   

  onPress = () => {
   
    this.props.navigation.navigate('Search', {
      placeholder: "Teste",
      type: 0,
      onLocationSelected: this.handleLocationSelected

    }); 

  
    };


verifica_date = () =>{

  var hours = new Date().getHours();
    var result = 0;
    

  if(hours >= 12){
    result = 1;
  }

  return result;
};
  
 Notifications = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}




 MyDrawer = () =>{
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
    <Drawer.Navigator drawerContent={props => <MenuSiga {...props} />}>
    
    
      <Drawer.Screen name="Notifications" component={() => <this.Notifications />} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

 CustomDrawerContent = (props) =>{
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </DrawerContentScrollView>
  );
}


  renderContent = () => {

    

    return (

    
      <View style={styles.contentContainer } > 



{ this.verifica_date() === 0 ? (
  
  <Text  style={{ color: '#3CB371' ,  fontSize: 18,   fontWeight: "bold" }}>Bom dia</Text>

 
  
) : (
  
  <Text style={{  color: '#3CB371' , fontSize: 18,   fontWeight: "bold" }} >Boa tarde</Text>


)}

{/*
  <Text  style={{ color: '#3CB371' ,  fontSize: 18,   fontWeight: "bold" }}>Bom dia</Text>
  */}



  
        <View style={styles.buttonContainerOrigem } >
        <ImageBackground source={require('../../images/botao_origem.png')} style={{ resizeMode: "cover",
    justifyContent: "center", height: 70 }} >
        
      <TextInput  onTouchStart={()=> this.onPress() } placeholderTextColor = "#808080"  style={{     height: 40, paddingLeft: 70,   borderRadius: 15, width: 330, bottom: 5}} placeholder="De onde?"   />
      </ImageBackground>
      </View>


      <View style={styles.buttonContainerOrigem } >
      <ImageBackground source={require('../../images/botao_destino.png')} style={{ resizeMode: "cover",
    justifyContent: "center", height: 70, bottom: 20 }} >
        
      <TextInput onTouchStart={()=> this.onPress() } placeholderTextColor = "#808080"  style={{    height: 40, paddingLeft: 70,   borderRadius: 15, width: 330, bottom: 0}} placeholder="Para onde?"   />
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

   

  }3

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
    this.setState({  duration: 0 });
  };


  

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
        >



<Marker
          coordinate={region}
          title={'Vc está aqui!'}
          
        />
          
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
         

             <Icon name="menu" size={50} color="#3CB371" style={{ top: -450, left: 10}}  />
        
            */} 


          </>  
        )}



<Icon name="menu" size={40} color="#3CB371"  style={{ top: -540, left: 10}} onPress={ () =>  this.props.navigation.dispatch(DrawerActions.openDrawer())} />
  
<BottomDrawer
       containerHeight={250}
       
       offset={0}
      
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

  contentContainer: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'space-around'
    
  },
  buttonContainerOrigem: {
    flexDirection: 'row',
     borderRadius: 15
    
  },
  buttonContainerDestiny: {
    flexDirection: 'row',
   
  },
  text: {
    paddingHorizontal: 5
  }
});
