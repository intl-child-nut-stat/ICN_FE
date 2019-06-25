import {GETTING_COUNTRIES, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_ERROR,
    GETTING_COMMUNITIES, GET_COMMUNITIES_SUCCESS, GET_COMMUNITIES_ERROR} from '../actions'

const initialState = {
    countries: [],
    communities: [],
    isGetting: false,
    errorMessage: null
}

export default (state=initialState, {type,payload}) => {
    switch(type){
        case GETTING_COUNTRIES:
            return{
                ...state,
                isGetting: true
            }
        case GET_COUNTRIES_SUCCESS:
            return{
                ...state,
                isGetting: false,
                countries: payload
            }
        case GET_COUNTRIES_ERROR:
            return{
                ...state,
                isGetting: false,
                errorMessage: payload
            }
        case GETTING_COMMUNITIES:
            return{
                ...state,
                isGetting: true
            }
        case GET_COMMUNITIES_SUCCESS:
            return{
                ...state,
                isGetting: false,
                communities: payload
            }
        case GET_COMMUNITIES_ERROR:
            return{
                ...state,
                isGetting: false,
                errorMessage: payload
            }
        default:
            return state
    }
}