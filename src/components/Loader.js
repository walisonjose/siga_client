import React, {Component} from 'react';
import {Text, ActivityIndicator, TouchableOpacity, View} from 'react-native';
import Modal from "react-native-modal";


class Input extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            show,
        } = this.props;
        return (
            <View
            >
                <Modal
                    testID={'modalLoader'}
                    isVisible={show}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 15,
                    }}>
                        <ActivityIndicator size="large"  />  
                        <Text style={{
                            color: "#000",
                            marginTop: 20,
                            fontSize: 15
                        }}>Aguarde...</Text>  
                    </View>
                </Modal>
            </View>
        );
    }
}
export default Input;
