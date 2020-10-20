import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';


/*import { createAppContainer } from 'react-navigation'; */
import { createStackNavigator } from 'react-navigation-stack'; 

import formLogin from './components/signIn/index';
//import listaUser from './pages/listauser';
//import listaMotora from './pages/listamotora';
//import sigaUser from './pages/sigauser';
//import sigaMotora from './pages/sigamotora_component';
////import ouvidoria from './pages/reclama';
import Map from './components/Map/index';
import Search from './components/Search/index';
import Menu from './components/Menu/index';

import Voice from './components/Voice/Voice';

import driverDetails from './components/Map/driverDetails';

import Icon from 'react-native-vector-icons/MaterialIcons';

///import MapMotora from './pages/map_motora';
//import CalloutMap from './pages/motora_siga/mapa_callout_apa';
//import MapsRoutes from  './pages/test_map/maps_routes';
//import Uber from  './pages/uberclone/src/index';
//import CalloutMapRolezim from './pages/rolezim/mapa_callout';



 
import Ionicons from 'react-native-vector-icons/FontAwesome';

import {   createAppContainer } from 'react-navigation';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';





class HomeScreen extends React.Component {

  



  
  render() {
    return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Página Inicial</Text>
      </View>
     
    );
  }
}





const AppNavigator = createStackNavigator(
 
  {
     //Main: Main,
     Voice: Voice,
     formLogin: formLogin,
     driverDetails: driverDetails,
     Menu: {
      screen: Menu,  
      navigationOptions: {

   
        headerShown: false,
          }, 
     },
     Search: {
      screen: Search,
      navigationOptions: { 
        title: 'Defina o seu destino',
        headerStyle: {

           
 backgroundColor: '#3CB371',
       
                     },
     },
    },
     
    // listaUser: listaUser,
     //listaMotora: listaMotora,
    // sigaMotora: sigaMotora,
    // sigaUser: sigaUser,
    // ouvidoria: ouvidoria,
    // MapMotora: MapMotora,
     Map:  { 
         screen: Map,
        navigationOptions: ({navigation}) => ({ 
           title: '',
                headerTitleAlign: "center",
                headerTintColor: '#FFF',
                headerTransparent: true,
                headerLeft: () => <View style={{  backgroundColor: 'transparent', }}>
                  <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                  <Icon name="menu" size={45} color="#3CB371" style={{ left: 10, top: 15}}  />
                  </TouchableOpacity>
                  </View>,
                 
        }),
       
        }, 
   //  CalloutMap: CalloutMap,
     //MapsRoutes: MapsRoutes,
   //  Uber: { 
    //   screen: Uber,
    //   navigationOptions: {
    //    header: null,
    //  },
    //  },
     //CalloutMapRolezim: CalloutMapRolezim,
  },
     
  {
    initialRouteName: 'Map',
  }
);







export default createAppContainer(AppNavigator); 





/* Teste de menu


const App = createBottomTabNavigator(
  {
    Main: { screen: Main },
    formLogin: { screen: formLogin }, 
    Uber: { screen: Uber},
    ouvidoria: { screen: ouvidoria },
    listaUser: { screen: listaUser },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Main') {
          iconName = `info-circle${focused ? '' : ''}`;
        } else if (routeName === 'formLogin') {
          tabBarVisible = false;
          iconName = `lock${focused ? '' : ''}`;
        }else if (routeName === 'Uber') {
          iconName = `car${focused ? '' : ''}`; 
        }else if (routeName === 'ouvidoria') {
          iconName = `bullhorn${focused ? '' : ''}`;
        }else if (routeName === 'listaUser') {
          iconName = `group${focused ? '' : ''}`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    initialRouteName: "formLogin",
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
    },
  }
);
export default createAppContainer(App); */


/*Novo teste



const SettingsTab = createStackNavigator(
  {
    Main: Main ,
  //  formLogin: formLogin ,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#FFFFFF',
      title: 'Settings Tab',
     
    },
  }
);



const MainApp = createBottomTabNavigator(
  {
    Main: { screen: Main },
    formLogin: { screen: formLogin
      
     }, 
    Uber: { 
      screen: Uber
      },
    ouvidoria: { screen: ouvidoria }, 
    listaUser: { screen: listaUser },
    
  },

  
  {
    defaultNavigationOptions: ({ navigation }) => ({

     
    

      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        let tabBarVisible = true;
        if (routeName === 'Main') {
          iconName = `info-circle${focused ? '' : ''}`;
        }  else if (routeName === 'formLogin') {
          
          iconName = `lock${focused ? '' : ''}`;
        }else if (routeName === 'Uber') {
          iconName = `car${focused ? '' : ''}`; 
        }else if (routeName === 'ouvidoria') {
          iconName = `bullhorn${focused ? '' : ''}`;
        }else if (routeName === 'listaUser') {
          iconName = `group${focused ? '' : ''}`;
        } else if (routeName === 'Qrcode') {
          iconName = `qrcode${focused ? '' : ''}`;
        } 
        return <IconComponent name={iconName} tabBarVisible size={25} color={tintColor} />;
      },
    }),
    initialRouteName: "formLogin",
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
      
    },
  }
);

Main.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state;

  if ( routeName === 'formLogin' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}
export default createAppContainer(MainApp);
 */