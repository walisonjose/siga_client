import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './styles';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import {connect} from "react-redux";



class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View >
          
          <ImageBackground source={require('../../images/backgroundaparecida.png')} style={{ resizeMode: "cover",
    justifyContent: "center", height: 200 }} >
          <Image
        style={{ height: 75, width: 75, left: 10, borderRadius: 35, top: 35 }}
        source={ {uri: this.props.avatar}}
      /> 
      
       
        <Image
      style={{  left: 110, bottom: 35, height: 60, width: 150 }}
      source={require('../../assets/logomarca_rodape.png')} 
    />
      <Text style={{ color: '#FFF', fontSize: 16,  left: 10, top: -25}}>{this.props.name}</Text>
      <Text style={{ color: '#FFF', fontSize: 16,  left: 10, top: -20}}>{this.props.email}</Text>

          </ImageBackground>
         
          </View>

<View style={{ paddingLeft: 10, paddingTop: 10}}> 

 <Icon name="map" size={35} color="grey"  />
 <Text style={{ left: 50, top: -30, fontSize: 17, fontWeight: 'bold', color: 'grey'}}>Mapa</Text>
 
          

<Icon name="message" size={35} color="grey"  />
<Text style={{ left: 50, top: -35, fontSize: 17, fontWeight: 'bold', color: 'grey'}}>Fale conosco</Text>


<Icon name="history" size={35} color="grey"  />
<Text style={{ left: 50, top: -30, fontSize: 17, fontWeight: 'bold', color: 'grey'}} >Histórico</Text>

<Icon name="hearing" size={35} color="grey"  />
<Text style={{ left: 50, top: -30, fontSize: 17, fontWeight: 'bold', color: 'grey'}}>Reclamação/Elogio</Text>

<TouchableOpacity
       
        onPress={()=> { console.log("QQQQ"); this.props.navigation.navigate("Login"); } }
      >
<MaterialIcons name="logout" size={35} color="grey"  /> 
<Text style={{ left: 50, top: -30, fontSize: 17, fontWeight: 'bold', color: 'grey'}}>Sair</Text>
</TouchableOpacity>

</View>  
          
        </ScrollView>
         <View style={styles.footerContainer}>
          <Text>Diretoria de Inovação</Text> 
        </View>
        
      </View>
    );
  }
}



SideMenu.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => {
  return {
    

    name: state.AuthenticationReducer.name,
     email: state.AuthenticationReducer.email,
     avatar: state.AuthenticationReducer.avatar,
  }
};

export default connect(mapStateToProps)(SideMenu);

