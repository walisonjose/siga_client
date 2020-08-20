import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes.js';
import DrawnerMenu from './src/drawner.js';

import {connect, Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import Reducers from './src/components/reducers/index';

import ReduxThunk from 'redux-thunk'; 






export default function App() {
  return (
   /* <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>  */
    <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
    <DrawnerMenu /> 
    </Provider>
   

    
   
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
