import React, { Component } from "react";
import {
  View,
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

import { Avatar, IconButton, Colors, Divider } from "react-native-paper";

export default class driverDetails extends Component {
  render() {
    return (
      <>
        <ImageBackground
          source={require("../../images/theme_confirm.png")}
          style={{
            alignContent: "center",
            alignItems: "center",
            height: "65%",
            resizeMode: "cover",
            
          }}
        >
          <IconButton
            icon="keyboard-backspace"
            color={Colors.white}
            size={60}
            style={{ left: -140, marginTop: 10 }}
            onPress={() => console.log("Pressed")}
          />
          <Avatar.Image
            size={84}
            source={{
              uri:
                "https://sigadev.aparecida.go.gov.br/paperclip/drivers/profile_pictures/6360c9194603fc778d3f8b2dee130aa98d2eb31c/thumb.png?1599229147",
            }}
            style={{ marginTop: -35 }}
          />

          <Text
            style={{
              color: "#307597",
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Walison José de Deus
          </Text>
 
          
        </ImageBackground>
        
        <View style={{ flexDirection: "row", width: "100%"}}>
            
        <Image
                  style={{
                    height: 80,
                    width: 130,
                    marginTop: -150,
                       
                  }}
                  source={require('../../images/asset_relogio.png')}
                /> 
                <Text style={{ color: Colors.blue100, fontWeight: "bold", top: -120, left: 30}}>Chega em 15 minutos</Text>
                </View> 
                <Divider style={{ borderColor: Colors.blue100, borderWidth: 1, top: -90}}/>

                <View style={{ flexDirection: "row", width: "100%", marginTop: 60}}>
            
            <Image
                      style={{
                        height: 80,
                        width: 130,
                        marginTop: -150,
                           
                      }}
                      source={require('../../images/asset_placa_motorista.png')}
                    /> 
                    <Text style={{ color: Colors.blue100, fontWeight: "bold", top: -120, left: 30}}>Chega em 15 minutos</Text>
                    </View> 
                    <Divider style={{ borderColor: Colors.blue100, borderWidth: 1, top: -90}}/>
    

                    <View style={{ flexDirection: "row", width: "100%", marginTop: 60}}>
            
            <Image
                      style={{
                        height: 80,
                        width: 130,
                        marginTop: -150,
                           
                      }}
                      source={require('../../images/asset_celu_user.png')}
                    /> 
                    <Text style={{ color: Colors.blue100, fontWeight: "bold", top: -120, left: 30}}>Chega em 15 minutos</Text>
                    </View> 
                    <Divider style={{ borderColor: Colors.blue100, borderWidth: 1, top: -90}}/>
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 60}}>
            
            <Image
                      style={{
                        height: 80,
                        width: 130,
                        marginTop: -150,
                           
                      }}
                      source={require('../../images/asset_pontuacao_motorista2.png')}
                    /> 
                    <Text style={{ color: Colors.blue100, fontWeight: "bold", top: -120, left: 30}}>Chega em 15 minutos</Text>
                    </View> 
                    <Divider style={{ borderColor: Colors.blue100, borderWidth: 1, top: -90}}/>










              {/*     <Image
                  style={{
                    height: 80,
                    width: 130,
                  
                    
                  }}
                  source={require('../../images/asset_placa_motorista.png')}
                />
                
                 <Divider style={{ borderColor: Colors.blue100, borderWidth: 1}}/>
                <Image
                  style={{
                    height: 80,
                    width: 130,
                    
                    
                  }}
                  source={require('../../images/asset_celu_user.png')}
                />
                 <Divider style={{ borderColor: Colors.blue100, borderWidth: 1 }}/>
                <Image
                  style={{
                    height: 80,
                    width: 130,
                    
                    
                  }}
                  source={require('../../images/asset_pontuacao_motorista2.png')} 
                />
                 <Divider style={{ borderColor: Colors.blue100, borderWidth: 1}}/>
                 
      //  </View> */} 


       


      </>
    );
  }
}
