import React, { Component } from "react";

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText,
  Back,
  
} from "./styles";

import uberx from "../../assets/uberx.png";
import backImage from "../../assets/back.png";

export default class Details extends Component {
  state = {
    duration: 0,
    destination: null
  };


  render() {

    const { duration, destination } = this.props;
    return (
<Container>
        <TypeTitle>Siga</TypeTitle>

        

        <TypeImage source={uberx} /> 
        <TypeTitle>Tempo de viagem</TypeTitle>
    <TypeDescription>{duration} minutos</TypeDescription>

        <RequestButton onPress={() => {}}>
          <RequestButtonText>SOLICITAR MOTORISTA</RequestButtonText>
        </RequestButton>
      </Container> 
    );
  }


  
}

{/*
      <Container>
        <TypeTitle>Siga</TypeTitle>
        <TypeDescription>Viagens baratas para o dia a dia</TypeDescription> 

        <TypeImage source={uberx} />
        <TypeTitle>Tempo de viagem</TypeTitle>
    <TypeDescription>{duration} minutos</TypeDescription>

        <RequestButton onPress={() => {}}>
          <RequestButtonText>SOLICITAR MOTORISTA</RequestButtonText>
        </RequestButton>
      </Container> */}
