import {
    AUTHENTICATION_CHANGE_PROPS,
} from './Types';

import {api} from "../../services/api2";

import {AsyncStorage} from "react-native";

export const savePropsAuthentication = (document) => ({
    type: AUTHENTICATION_CHANGE_PROPS,
    payload: document
})

export const autenticar = (login, password) => {
    return (dispatch, getState) => {
        // if (getState().data[userId].isLoaded) {
        //     return Promise.resolve();
        // }

        if (login === 'solicitante@email.com' && login === '123') {
            dispatch({
                type: AUTHENTICATION_CHANGE_PROPS,
                payload: {
                    isLoading: false,
                    user : {
                        isDeliver: false
                    }
                }
            })
        } else if (login === 'entregador@email.com' && login === '123') {
            dispatch({
                type: AUTHENTICATION_CHANGE_PROPS,
                payload: {
                    isLoading: false,
                    user : {
                        isDeliver: true
                    }
                }
            })
        } else {
            dispatch({
                type: AUTHENTICATION_CHANGE_PROPS,
                payload: {
                    isLoading: false,
                    user : null
                }
            })
        }


        // fetch(`http://data.com/${userId}`)
        //     .then(res => res.json())
        //     .then(
        //         data => dispatch({
        //             type: AUTHENTICATION_CHANGE_PROPS,
        //             payload: document
        //         }),
        //         err => dispatch({ type: 'LOAD_SOME_DATA_FAILURE', err })
        //     );
    }
}

export const stopSync = () => {
    Location.stopLocationUpdatesAsync('background-location-task')
}

export const logout = () => {
    Location.stopLocationUpdatesAsync('background-location-task')
}

export const saveToken = async ( token) => {

    console.log("Token "+token);
  {/*   const tokenExpo = await AsyncStorage.getItem('token');

    return  new Promise((resolve, reject) => {
        api.post('updateuserexpotoken', { id, expo_token: tokenExpo } ,{ headers: { Authorization: 'Bearer ' + token } } ).then(result => {
            const { data } = result

            if (data.success) {
                resolve(data)
            } else {
                throw Error('Nenhum item encontrado')
            }
        }).catch(e => {
            //component.refs.toast.show('Nenhum item encontrado', DURATION.LENGTH_LONG)
            reject(e)
        })
    })
    */}
}



