import {GETTING_COUNTRIES, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_ERROR,
    GETTING_COMMUNITIES, GET_COMMUNITIES_SUCCESS, GET_COMMUNITIES_ERROR,
    GETTING_CHILDREN, GET_CHILDREN_SUCCESS, GET_CHILDREN_ERROR,
    ADDING_COUNTRY, ADD_COUNTRY_SUCCESS, ADD_COUNTRY_ERROR, 
    ADDING_COMMUNITY, ADD_COMMUNITY_SUCCESS, ADD_COMMUNITY_ERROR,
    ADDING_CHILD, ADD_CHILD_SUCCESS, ADD_CHILD_ERROR,
} from '../actions'

const initialState = {
    countries: [],
    communities: [],
    children: [],
    isGetting: false,
    isAdding: false,
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
        case GETTING_CHILDREN:
            return{
                ...state,
                isGetting: true
            }
        case GET_CHILDREN_SUCCESS:
            return{
                ...state,
                isGetting: false,
                children: payload
            }
        case GET_CHILDREN_ERROR:
            return{
                ...state,
                isGetting: false,
                errorMessage: payload
            }
        case ADDING_COUNTRY:
            return{
                ...state,
                isAdding: true,
                errorMessage: null
            }
        case ADD_COUNTRY_SUCCESS:
            return {
                ...state,
                isAdding: true,
                countries: [...state.countries, payload]
            }
        case ADD_COUNTRY_ERROR:
            return {
                ...state,
                isAdding: false,
                errorMessage: payload
            }
        case ADDING_COMMUNITY:
            return{
                ...state,
                isAdding: true,
                errorMessage: null
            }
        case ADD_COMMUNITY_SUCCESS:
            return {
                ...state,
                isAdding: false,
                communities: [...state.communities,payload]
            }
        case ADD_COMMUNITY_ERROR:
            return {
                ...state,
                isAdding: false,
                errorMessage: payload
            }
            case ADDING_CHILD:
            return{
                ...state,
                isAdding: true,
                errorMessage: null
            }
        case ADD_CHILD_SUCCESS:
            return {
                ...state,
                isAdding: false,
                children: [...state.children,payload]
            }
        case ADD_CHILD_ERROR:
            return {
                ...state,
                isAdding: false,
                errorMessage: payload
            }
        default:
            return state
    }
}