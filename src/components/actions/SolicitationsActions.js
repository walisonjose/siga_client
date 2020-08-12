import {
    SOLICITATIONS_CHANGE_PROPS,
    SOLICITATIONS_NEW_RESET_CHANGE
} from './Types';
import {api} from "../services/axios";
import moment from 'moment'

export const savePropsSolicitations = (document) => ({
    type: SOLICITATIONS_CHANGE_PROPS,
    payload: document
})

export const resetPropsNewSolicitation = (document) => ({
    type: SOLICITATIONS_NEW_RESET_CHANGE,
    payload: null
})

export const getNewSolicitations = () => {
    return (dispatch, getState) => {
        const store = getState()
        const { user, hospitalPrincipal } = store.AuthenticationReducer

        dispatch({
            type: SOLICITATIONS_CHANGE_PROPS,
            payload: {
                isFetchingSolicitations: true
            }
        });

        let url = 'getrequestbloodbyhospital?id_hospital=' + hospitalPrincipal
        if (user.user_is_deliveryman) {
            url = 'getrequestbloodbydeliveryman?id_deliveryman=' + user.id
        }

        api.get(url, { headers: { Authorization: 'Bearer ' + store.AuthenticationReducer.token } } ).then(result => {
            const { data } = result

            // statusrequest > 3 vai para o historico

            let historySolicitationsInit = []
            let newSolicitationsInit = []

            if (data.data) {
                for( let item of data.data) {
                    if (item.request_status_request[0] && item.request_status_request[0].id <= 3) {
                        newSolicitationsInit.push(item)
                    } else {
                        historySolicitationsInit.push(item)
                    }
                }
            }

            newSolicitationsInit.sort(function(itemA, itemB){
                return itemA.type_transfusion[0].id < itemB.type_transfusion[0].id
            });

            historySolicitationsInit.sort(function(itemA, itemB){
                let created_atA = moment(itemA.metadata.created_at).format('X')
                let created_atB = moment(itemB.metadata.created_at).format('X')

                return parseInt(created_atB) - parseInt(created_atA)
            });

            dispatch({
                type: SOLICITATIONS_CHANGE_PROPS,
                payload: {
                   isFetchingSolicitations: false,
                   newSolicitations: newSolicitationsInit,
                    historySolicitations: historySolicitationsInit,
                }
            });
        }).catch(e => {
            console.log(e.response)
            //component.refs.toast.show('Nenhum item encontrado', DURATION.LENGTH_LONG)
            dispatch({
                type: SOLICITATIONS_CHANGE_PROPS,
                payload: {
                    isFetchingSolicitations: false
                }
            });
        })
    };
}

export const getNewSolicitation = (id) => {
    return (dispatch, getState) => {
        const store = getState()
        let url = 'getrequestblooddetails?id=' + id
        const request = api.get(url, { headers: { Authorization: 'Bearer ' + store.AuthenticationReducer.token } } )

        request.then(result => {
            const { data } = result

            if (data.success) {
                dispatch({
                    type: SOLICITATIONS_CHANGE_PROPS,
                    payload: {
                        viewNewSolicitation: data.data[0],
                    }
                });
            } else {
                dispatch({
                    type: SOLICITATIONS_CHANGE_PROPS,
                    payload: {
                        viewNewSolicitation: false
                    }
                });
            }
        }).catch(e => {
            dispatch({
                type: SOLICITATIONS_CHANGE_PROPS,
                payload: {
                    viewNewSolicitation: false
                }
            });
        })
    };
}

export const updateStatusSolicitation = (data, token) => {
    return  new Promise((resolve, reject) => {
        api.post('updatestatusrequestblood', data ,{ headers: { Authorization: 'Bearer ' + token } } ).then(result => {
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
}