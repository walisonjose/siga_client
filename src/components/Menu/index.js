import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './styles';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

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
      style={{  left: 90, bottom: 35, height: 60, width: 210 }}
      source={require('../../images/logoaparecida.png')}
    />
      <Text style={{ color: '#FFF', fontSize: 16,  left: 10, top: -25}}>Walison José de Deus</Text>
      <Text style={{ color: '#FFF', fontSize: 16,  left: 10, top: -20}}>walison.deus@aparecida.go.gov.br</Text>

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

<MaterialIcons name="logout" size={35} color="grey"  /> 
<Text style={{ left: 50, top: -30, fontSize: 17, fontWeight: 'bold', color: 'grey'}}>Sair</Text>


</View>  
          
        </ScrollView>
         <View style={styles.footerContainer}>
          <Text>Versão aqui</Text>
        </View>
        
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;