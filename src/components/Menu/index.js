import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './styles';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

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
        source={ {uri: "https://siga.aparecida.go.gov.br/paperclip/users/profile_pictures/b57cdc667ef7832f45e76264c7825412bcecdd7d/thumb.jpg?1562098524"}}
      /> 
        <Image
      style={{  left: 90, bottom: 35, height: 75, width: 210 }}
      source={require('../../images/logoaparecida.png')}
    />
      <Text style={{ color: '#FFF', fontSize: 16,  left: 10, top: -25}}>Walison José de Deus</Text>
      <Text style={{ color: '#FFF', fontSize: 16,  left: 10, top: -20}}>walison.deus@aparecida.go.gov.br</Text>

          </ImageBackground>
         
          </View>

<View style={{ paddingLeft: 10, paddingTop: 10}}> 

 <Icon name="map" size={40} color="#3CB371"  />
 <Text style={{ left: 50, top: -30, fontSize: 17, fontWeight: 'bold'}}>Mapa</Text>
 
          

<Icon name="message" size={40} color="#3CB371"  />
<Text style={{ left: 50, top: -35, fontSize: 17, fontWeight: 'bold'}}>Fale conosco</Text>


<Icon name="history" size={40} color="#3CB371"  />
<Text style={{ left: 50, top: -30, fontSize: 17, fontWeight: 'bold'}} >Histórico</Text>

<Icon name="hearing" size={40} color="#3CB371"  />
<Text style={{ left: 50, top: -30, fontSize: 17, fontWeight: 'bold'}}>Reclamação/Elogio</Text>

<MaterialIcons name="logout" size={40} color="#3CB371"  /> 
<Text style={{ left: 50, top: -30, fontSize: 17, fontWeight: 'bold'}}>Sair</Text>


</View>  
          
        </ScrollView>
       {/*  <View style={styles.footerContainer}>
          <Text>Footer Aqui!!</Text>
        </View>
        */}
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;