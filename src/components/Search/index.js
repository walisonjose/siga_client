import React, { Component } from "react";
import { Platform, Image, Text, ImageBackground, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { View } from "native-base";

import Icon from 'react-native-vector-icons/MaterialIcons';

import IconClose from 'react-native-vector-icons/MaterialCommunityIcons';


import RNGooglePlaces from 'react-native-google-places';

export default class Search extends Component {
  state = {
    searchFocused: false
  };

 
  
  

  render( ) {
    const { searchFocused } = this.state;
   
    
  //  const {type, itemId, onLocationSelected, onLocationOriginSelected  } = this.props.route.params;

  const {type, itemId, onLocationSelected, onLocationOriginSelected, icon, placeholder  } = this.props;

{/* onPress={ type === 0 ? onLocationOriginSelected : onLocationSelected  } */} 

    return (
<>

  <GooglePlacesAutocomplete
        placeholder={placeholder}
        placeholderTextColor="#333"
        onPress={ type === 0 ? onLocationOriginSelected : onLocationSelected  }
        query={{
          key: "AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860",
          language: "pt"
        }}
        autoFocus={true} 
        textInputProps={{
          onFocus: () => {
            this.setState({ searchFocused: true });
          },
          onBlur: () => {
            this.setState({ searchFocused: false });
          },
          autoCapitalize: "none",
          autoCorrect: false
        }}
        listViewDisplayed={searchFocused}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={{
          container: {
            position: "absolute",
            top: Platform.select( type === 0 ? { ios: 70, android: 15 } : { ios: 70, android: 15 } ),
            width: "110%",
            backgroundColor: "#FFF",
            right: -10, 
            left: -18
            
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: "#FFF",
       
            height: 50,
            marginHorizontal: 20,
            borderTopWidth: 0,
            borderBottomWidth: 0

          },
          textInput: {
            height: 50,
            margin: 0,
            borderRadius: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 25,
            paddingRight: 20,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: "#DDD",
            fontSize: 18,
            borderRadius: 15
          },
          listView: {
            
            zIndex: 500,
            borderWidth: 1,
            borderColor: "#DDD",
            backgroundColor: "#FFF",
            marginHorizontal: 20,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            
            
          },
          description: {
            fontSize: 12
          },
          row: {
            padding: 10,
            height: 58
          }
        }}
      />
      
 <IconClose name="close-box" size={45} color="#3CB371" style={{ top: Platform.OS === 'ios' ? 70 : 15, left: Platform.OS === 'ios' ? (Dimensions.get('window').width - 50) : 310 }} onPress={ icon} />
       
     

   </>
      );
    }
  }




