import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './styles';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Image, ImageBackground } from 'react-native';

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
      style={{  left: 100, bottom: 35, height: 75, width: 210 }}
      source={require('../../images/logoaparecida.png')}
    />
      <Text style={{ color: '#FFF', fontSize: 16,  left: 10, top: -25}}>Walison José de Deus</Text>
      <Text style={{ color: '#FFF', fontSize: 16,  left: 10, top: -20}}>walison.deus@aparecida.go.gov.br</Text>

          </ImageBackground>
         
          </View>
         
         
          
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>Footer Aqui!!</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;