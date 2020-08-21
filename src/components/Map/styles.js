import styled, { css } from "styled-components/native";
import { Platform } from "react-native";


export const Container = styled.View`
  background: #fff;
  height: 270px;
  width: 100%;
  position: absolute;
  bottom: 0;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  shadow-radius: 10;
  elevation: 3;
  border: 1px solid #ddd;
  align-items: center;
  padding: 20px;
`;

export const LocationBox = styled.View`
  background: #fff;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  elevation: 1;
  border: 1px solid #ddd;
  border-radius: 3px;
  flex-direction: row;

  ${Platform.select({
    ios: css`
      margin-top: 20px;
    `,
    android: css`
      margin-top: 10px;
      margin-left: 10px;
    `
  })}
`;

export const LocationBoxRun = styled.View`
  background: #3CB371;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  elevation: 1;
  border: 1px solid #ddd;
  border-radius: 12px;
  flex-direction: row;

  ${Platform.select({
    ios: css`
      margin-top: 20px;
    `,
    android: css`
      margin-top: 15px;
      margin-left: 5px;
      margin-right: 25px;
    `
  })}
`;

export const Logo = styled.Image`
  height: 35%;
  marginBottom: 40px;
`;

export const LocationText = styled.Text`
  margin: 8px 10px;
  font-size: 14px;
  color: #333;
`;
export const LocationTextRun = styled.Text`
  top: 10;
  left: 15;
  font-size: 12px;
  color: #FFF;
  
`;

export const LocationTimeBox = styled.View`
  background: #000;
  padding: 3px 8px;
  
`;

export const LocationTimeText = styled.Text`
  color: #fff;
  
  font-size: 12px;
  text-align: center;
`;

export const LocationTimeBoxRun = styled.View`
  background: #3CB371;
  padding: 3px 4px;
  border-radius: 18px;
`;

export const LocationTimeTextRun = styled.Text`
  color: #fff;
  font-size: 12px;
  text-align: center;
  left: 10px;
`;

export const LocationTimeTextSmall = styled.Text`
  color: #fff;
  font-size: 8px;
  text-align: center;
`;

export const LocationTimeTextSmallRun = styled.Text`
  color: #fff;
  font-size: 10px;
  text-align: justify;
  left: 10px;
`;

export const Back = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.select({ ios: 60, android: 40 })};
  left: 10px;
  backgroundColor: #FFF;
  borderRadius: 15;
  top: 10;
`;
export const RequestButton = styled.TouchableOpacity`
  background: #3CB371;
  justify-content: center;
  align-items: center;
  height: 44px;
  align-self: stretch;
  margin-top: 15px;
  borderRadius: 15;
  
`;

export const RequestButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;
export const TypeTitle = styled.Text`
  font-size: 20px;
  color: #222;
 
`;

export const TypeDescription = styled.Text`
  color: #666;
  font-size: 14px;
  
`;

export const TypeImage = styled.Image`
  height: 80px;
  margin: 10px 0;
  
`;

export const Button = styled.TouchableHighlight`
  padding: 20px;
  borderRadius: 15px;
  backgroundColor: #EEDD82;
  alignSelf: stretch;
  margin: 15px;
  left: 8px;
  marginHorizontal: 20px;
  marginTop: 45px
`;

export const ButtonText = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;
