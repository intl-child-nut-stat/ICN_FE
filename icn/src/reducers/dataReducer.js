import {GETTING_DATA, GET_DATA_SUCCESS, GET_DATA_ERROR,
    ADDING_DATA, ADD_DATA_SUCCESS, ADD_DATA_ERROR,
    DELETING_DATA, DELETE_DATA_SUCCESS, DELETE_DATA_ERROR,
    UPDATING_DATA, UPDATE_DATA_SUCCESS, UPDATE_DATA_ERROR,
    SET_CHILD_NAME, SET_BMI
} from '../actions'

const initialState = {
    country: [],
    community: [],
    children: [],
    screening: [],
    BMI: [],
    childName: '',
    isGetting: false,
    isAdding: false,
    isDeleting: false,
    isUpdating: false,
    errorMessage: null
}

export default (state=initialState, {type,payload, data, newObj}) => {
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
        case DELETING_DATA:
            return{
                ...state,
                isDeleting: true,
                errorMessage: null
            }
        case DELETE_DATA_SUCCESS:
            let deletedData = state[data].filter(item => item.id !==Number(payload))
            return {
                ...state,
                isDeleting: false,
                [data]: [...deletedData]
            }
        case DELETE_DATA_ERROR:
            return {
                ...state,
                isDeleting: false,
                errorMessage: payload
            }
        case UPDATING_DATA:
            return{
                ...state,
                isUpdating: true,
                errorMessage: null
            }
        case UPDATE_DATA_SUCCESS:
            let sameItems = state[data].filter(item => item.id !==Number(payload))
            if(newObj.country_id) newObj.country_id = Number(newObj.country_id)
            if(newObj.community_id) newObj.community_id = Number(newObj.community_id)
            let itemToUpdate = newObj
            return {
                ...state,
                isUpdating: false,
                [data]: [...sameItems, itemToUpdate]
            }
        case UPDATE_DATA_ERROR:
            return {
                ...state,
                isUpdating: false,
                errorMessage: payload
            }
        case SET_CHILD_NAME:
            let childName = state.children.filter(child => child.id === Number(payload))[0]
            return{
                ...state,
                childName
            }
        default:
            return state
    }
}