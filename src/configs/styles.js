import { Dimensions, StyleSheet } from "react-native";

export const TOAST_COLOR_ERROR = "#cc0000";
export const GREEN_BACKGROUND_COLOR = "#3CB371";
export const WHITE_BACKGROUND_COLOR = "#fff";
export const BLUE_BUTTON_COLOR = "#307597";
export const YELLOW_BUTTON_COLOR = "#dcd074";
export const ICON_BUTTON_COLOR = "#B2BF86";


export const styles = StyleSheet.create({
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
    logo: {
      marginTop: -730,
      marginBottom: 750,
      marginLeft: 300,
  
      flexDirection: "row",
    },
    logoText: {
      fontWeight: "bold",
      fontSize: 22,
    },
    positonBox: {
      backgroundColor: "#fff",
      borderRadius: 20,
      opacity: 0.75,
      marginTop: -170,
      marginHorizontal: 40,
      padding: 25,
      shadowColor: "#000",
      elevation: 5,
    },
    positonBoxTitle: {
      textAlign: "center",
      fontSize: 22,
      fontWeight: "bold",
      color: "#e74c3c",
    },
    positonBoxLatLon: { flexDirection: "row", justifyContent: "space-between" },
    locationButton: {
      backgroundColor: "#e74c3c",
      borderRadius: 150,
      marginTop: -25,
      width: 50,
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      elevation: 8,
    },
  
    contentContainer: {
      backgroundColor: "#307597",
      flex: 1,
  
      alignItems: "center",
      justifyContent: "space-around",
    },
    buttonContainerOrigem: {
      flexDirection: "row",
      borderRadius: 15,
      top: 5,
    },
    buttonContainerDestiny: {
      flexDirection: "row",
    },
    text: {
      paddingHorizontal: 5,
    },
  
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    containertimer: {
      flex: 1,
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.8,
    },
  
    button: {
      width: 350,
      height: 100,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontSize: 45,
      color: "#B9AAFF",
    },
    timerText1: {
      color: "#fff",
      fontSize: 20,
      marginBottom: 20,
      top: -70,
    },
    timerText: {
      color: "#fff",
      fontSize: 20,
      marginBottom: 20,
      top: 40,
    },
    buttonReset: {
      marginTop: 20,
      borderColor: "#FF851B",
    },
    buttonTextReset: {
      color: "#FF851B",
    },
  
    header: {
      backgroundColor: "#f7f5eee8",
      opacity: 0.7,
      shadowColor: "#000000",
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: "center",
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#00000040",
      marginBottom: 10,
    },
  });
