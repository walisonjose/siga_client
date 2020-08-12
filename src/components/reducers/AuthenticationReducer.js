import {
    AUTHENTICATION_CHANGE_PROPS
} from '../actions/Types';

// let logger = {
//     email: "drhouse@aparecida.go.gov.br5t",
//     password: "javajade"
// }

// let logger = {
//     email: "delivery@aparecida.go.gov.br",
//     password: "12345678"
// }


const INITIAL_STATE = {
    token: null,
   
    name: null,
     email: null,
     avatar: null,
    
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case AUTHENTICATION_CHANGE_PROPS:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};
