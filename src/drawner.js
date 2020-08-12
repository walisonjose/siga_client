import * as React from 'react';

import { Button, View, Text, TextInput, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/MaterialIcons';

/*Telas */
import formLogin from './components/signIn/index';

import Map from './components/Map/index';
import Search from './components/Search/index';
import Menu from './components/Menu/index';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";



{/*const Tab = createBottomTabNavigator(); */}

const Tab = createStackNavigator();


function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>No New Notifications!</Text>
      <Button 
      onPress={() => navigation.goBack()}
      title="Go back home"
      />
    </View>
  );
}

const Stack = createStackNavigator(
  
);

function TabAScreen() {
  return (
    <Stack.Navigator > 
      <Stack.Screen name="TabA Home" component={TabADetailsScreen} />
      <Stack.Screen name="TabA Details" component={Details} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}


function TabADetailsScreen({navigation}) {
  return (


    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>

 
<Button
        title="Open drawer"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Text>
        Welcome to TabA page!
      </Text>
      <Button 
      onPress={() => navigation.navigate('TabA Details')}
      title="Go to TabA Details"
      />

    
    </View>

   
  );
  
}
function Details() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>
        TabA Details here!
      </Text>
    </View>
  );
}
function TabBScreen() {
  return (
    <View>
      <Text style={{textAlign: 'center', marginTop: 300}}>
        Welcome to TabB page!
      </Text>
    </View>
  );
}



function HomeScreen() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'TabA') {
        iconName = focused
        ? 'ios-information-circle'
        : 'ios-information-circle-outline';
      } else if (route.name === 'TabB') {
        iconName = focused
        ? 'ios-list-box'
        : 'ios-list';
      }
return <Ionicons name={iconName} size={size} color={color}     />;
        },
      })}
      tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Map" component={Map}/>
        <Tab.Screen name="TabA" component={TabAScreen} />
        <Tab.Screen name="TabB" component={TabBScreen} />
        
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator( 
  
);


function Root() {
  return (
    <Stack.Navigator initialRouteName='Login'  >
      <Stack.Screen name="Map" component={Map}  options={{headerShown: false}} />
      <Stack.Screen name="Login" component={formLogin} options={{headerShown: false}} />
      <Stack.Screen name="Search" component={Search} options={{headerShown: false,   title: ''  , headerTransparent: true, headerStyle: {
              backgroundColor: '#008B8B', top: -10
           } }}  />
    </Stack.Navigator>
  );
}



{/* options={{headerShown: true,   title:   , headerTransparent: false, headerStyle: {
              backgroundColor: '#008B8B'
           } }} */}

function googleSearch() {

  return (
    <>
    <Text> asdasdasd</Text>
    </>
  
  );

}

{/* options={{headerShown: true,    headerTransparent: false, title:"", headerStyle: {
              backgroundColor: '#008B8B'
           } }} */}


export default function App() {
  return (

    <NavigationContainer>
      <Drawer.Navigator   drawerContent={props => <Menu {...props} />} >
      
        
     <Drawer.Screen name="Home" component={Root} />
       
       
  </Drawer.Navigator> 
    </NavigationContainer>
    
  
  );
}




