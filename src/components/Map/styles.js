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
      margin-top: 10px;
      margin-left: 10px;
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
  margin: 8px 10px;
  font-size: 14px;
  color: #FFF;
`;

export const LocationTimeBox = styled.View`
  background: #222;
  padding: 3px 8px;
`;

export const LocationTimeText = styled.Text`
  color: #fff;
  font-size: 12px;
  text-align: center;
`;

export const LocationTimeTextSmall = styled.Text`
  color: #fff;
  font-size: 10px;
  text-align: center;
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
