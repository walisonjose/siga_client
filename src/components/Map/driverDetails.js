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
  Linking,
} from "react-native";

import { Avatar, IconButton, Colors, Divider } from "react-native-paper";

export default class driverDetails extends Component {

    static navigationOptions = {
        headerShown: false,
      };


      state = {
          driver: this.props.route.params.driver,
          duration: this.props.route.params.duration,
      }


  formatPhoneNumber = (phoneNumberInitial) => {
    const phoneNumber = phoneNumberInitial;

    const dd = phoneNumber.substring(1, 3);
    const number = phoneNumber.substring(5, phoneNumber.length);

    const numberFinal = "+55" + dd + number;

    return numberFinal;
  };

  render() {
   // const { driver } = this.props.route.params.driver;

    console.log("Parms: "+this.props.route.params.name);
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
            onPress={() => this.props.navigation.goBack()}
          />
          
          <Avatar.Image
            size={84}

            

            source={{

              

              uri:
              this.state.driver.profile_picture.thumb  
           

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
          {this.state.driver.name}
          </Text>
        </ImageBackground>

        <View style={{ flexDirection: "row", width: "100%" }}>
          <Image
            style={{
              height: 80,
              width: 130,
              marginTop: -150,
            }}
            source={require("../../images/asset_relogio.png")}
          />
          <Text
            style={{
              color: "#307597",
              fontWeight: "bold",
              top: -120,
              left: 30,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            Chega em {this.state.duration} minutos
          </Text>
        </View>
        <Divider
          style={{ borderColor: Colors.blue100, borderWidth: 1, top: -90 }}
        />

        <View style={{ flexDirection: "row", width: "100%", marginTop: 60 }}>
          <Image
            style={{
              height: 80,
              width: 130,
              marginTop: -150,
            }}
            source={require("../../images/asset_placa_motorista.png")}
          />
          <Text
            style={{
              color: "#307597",
              fontWeight: "bold",
              top: -120,
              left: 30,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {this.state.driver.vehicle.license_plate}
          </Text>
        </View>
        <Divider
          style={{ borderColor: Colors.blue100, borderWidth: 1, top: -90 }}
        />

        <View style={{ flexDirection: "row", width: "100%", marginTop: 60 }}>
          <Image
            style={{
              height: 80,
              width: 130,
              marginTop: -150,
            }}
            source={require("../../images/asset_celu_user.png")}
          />
          <Text
            style={{
              color: "#307597",
              fontWeight: "bold",
              top: -120,
              left: 30,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {this.formatPhoneNumber(""+this.state.driver.phone)}
          </Text>
          <IconButton
            icon="phone"
            color="#307597"
            
            size={50}
            style={{ left: 35, marginTop: -150 }}
            onPress={() =>
              Linking.openURL(
                `tel: ` + this.formatPhoneNumber(""+this.state.driver.phone)
              )
            }
          />
        </View>
        <Divider
          style={{ borderColor: Colors.blue100, borderWidth: 1, top: -90 }}
        />
        <View style={{ flexDirection: "row", width: "100%", marginTop: 60 }}>
          <Image
            style={{
              height: 80,
              width: 130,
              marginTop: -150,
            }}
            source={require("../../images/asset_pontuacao_motorista2.png")}
          />
          <Text
            style={{
              color: "#307597",
              fontWeight: "bold",
              top: -120,
              left: 30,
              alignContent: "center",
              alignItems: "center",
            }}
          >
           {this.state.driver.vehicle.model}
          </Text>
        </View>
        <Divider
          style={{ borderColor: Colors.blue100, borderWidth: 1, top: -90 }}
        />

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
