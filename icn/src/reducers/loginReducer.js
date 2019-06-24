import {IS_LOGGING_IN, LOGIN_SUCCESS, LOGIN_ERROR, LOGGED_OUT, IS_SIGNING_UP, SIGNUP_SUCCESS, SIGNUP_ERROR} from '../actions'

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    isSigningUp: false,
    isSignedUp: false,
    errorMessage: null
}

export default (state=initialState, {type, payload}) => {
    switch(type){
        case IS_LOGGING_IN:
            return {
                ...state,
                isLoggingIn: true,
                errorMessage: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true
            }
        case LOGIN_ERROR:
            return {
                ...state,
                isLoggingIn: false,
                errorMessage: payload
            }
        case LOGGED_OUT:
            return {
                ...state,
                isLoggedIn: false
            }
        case IS_SIGNING_UP:
            return {
                ...state,
                isSigningUp: true,
                errorMessage: null
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isSigningUp: false,
                isSignedUp: true
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                errorMessage: payload
            }
        default:
            return state
    }
}