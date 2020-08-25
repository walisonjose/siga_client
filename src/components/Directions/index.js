import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyD157FiAI8dfBRzoH4qvzjFi3iKSPzA860"
    strokeWidth={3}
    strokeColor="#3CB371" 
   
  />
);

export default Directions;
