import {GETTING_DATA, GET_DATA_SUCCESS, GET_DATA_ERROR,
    ADDING_DATA, ADD_DATA_SUCCESS, ADD_DATA_ERROR
} from '../actions'

const initialState = {
    country: [],
    community: [],
    children: [],
    isGetting: false,
    isAdding: false,
    errorMessage: null
}

export default (state=initialState, {type,payload, data}) => {
    switch(type){
        case GETTING_DATA:
            return{
                ...state,
                isGetting: true,
                errorMessage:null
            }
        case GET_DATA_SUCCESS:
            return {
                ...state,
                isGetting: false,
                [data]: payload
            }
        case GET_DATA_ERROR:
            return {
                ...state,
                errorMessage: payload
            }
        case ADDING_DATA:
            return{
                ...state,
                isAdding: true,
                errorMessage: null
            }
        case ADD_DATA_SUCCESS:
            return {
                ...state,
                isAdding: false,
                [data]: [...state[data], payload]
            }
        case ADD_DATA_ERROR:
            return {
                ...state,
                isAdding: false,
                errorMessage: payload
            }
        default:
            return state
    }
}