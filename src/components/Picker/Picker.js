import React, {Component} from "react";
import { SafeAreaView, Text, Button } from "react-native";
import ReactNativePickerModule from "react-native-picker-module";

const dataset = [
  {
    value: 101,
    label: "Javascript",
  },
  {
    value: "golang_101",
    label: "Go",
  },
  {
    value: "kotlin_dsl",
    label: "Kotlin",
  },
  {
    value: "java_101",
    label: "Java",
  },
  {
    value: "cplusplus",
    label: "C++",
  },
  {
    value: "csharp_201",
    label: "C#",
  },
  {
    value: "php_201",
    label: "PHP",
  },
]
class Picker extends React.Component {
  constructor(props) {
    super(props)
    this.pickerRef = React.createRef()
    this.state = {
      value: null,
    }
  }
  

  render() {
    return (
        <>
        <SafeAreaView>
          <Button title="Select a language" onPress={() => this.pickerRef.current.show()} />
          <Text>Selected Item Text: {this.state.value}</Text>
        </SafeAreaView>
        <ReactNativePickerModule
          pickerRef={this.pickerRef}
          value={this.state.value}
          title={"Select a language"}
          items={dataset}
          selectedColor="#FC0"
          onCancel={() => {
            console.log("Cancelled")
          }}
          onValueChange={value => {
            this.setState({
              value: value,
            })
          }}
        />
      </>
    )
  }
}
export default Picker;