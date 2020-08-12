import {api} from "../services/axios";

export const saveDeliverManPosition = async (token, id_deliveryman, data) => {
    return new Promise((resolve, reject) => {
        api.post('setlocation', {
            id_deliveryman: parseInt(id_deliveryman),
            lat: data.lat,
            long: data.long
        } ,{ headers: { Authorization: 'Bearer ' + token } } ).then(result => {
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

export const getDeliverManPosition = async (token, id_deliveryman) => {
    return new Promise((resolve, reject) => {
        api.post('getlocation', { id_deliveryman: parseInt(id_deliveryman) } ,{ headers: { Authorization: 'Bearer ' + token } } ).then(result => {
            const { data } = result

            if (data.success) {
                resolve(data)
            } else {
                throw Error('Nenhum item encontrado')
            }
        }).catch(e => {
            console.log(e)
            //component.refs.toast.show('Nenhum item encontrado', DURATION.LENGTH_LONG)
            reject(e)
        })
    })
}