import axiosWithAuth from '../utils/axiosWithAuth'

export const GETTING_COUNTRIES = "GETTING_COUNTRIES"
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS"
export const GET_COUNTRIES_ERROR = "GET_COUNTRIES_ERROR"

export const GETTING_COMMUNITIES = "GETTING_COMMUNITIES"
export const GET_COMMUNITIES_SUCCESS = "GET_COMMUNITIES_SUCCESS"
export const GET_COMMUNITIES_ERROR = "GET_COMMUNITIES_ERROR"

export const GETTING_CHILDREN = "GETTING_CHILDREN"
export const GET_CHILDREN_SUCCESS = "GET_CHILDREN_SUCCESS"
export const GET_CHILDREN_ERROR = "GET_CHILDREN_ERROR"

export const ADDING_COUNTRY = "ADDING_COUNTRY"
export const ADD_COUNTRY_SUCCESS = "ADD_COUNTRY_SUCCESS"
export const ADD_COUNTRY_ERROR = "ADD_COUNTRY_ERROR"

export const ADDING_COMMUNITY = "ADDING_COMMUNITY"
export const ADD_COMMUNITY_SUCCESS = "ADD_COMMUNITY_SUCCESS"
export const ADD_COMMUNITY_ERROR = "ADD_COMMUNITY_ERROR"

export const ADDING_CHILD = "ADDING_CHILD"
export const ADD_CHILD_SUCCESS = "ADD_CHILD_SUCCESS"
export const ADD_CHILD_ERROR = "ADD_CHILD_ERROR"

export const getCountries = (isAdmin, id) => dispatch => {
    dispatch({type: GETTING_COUNTRIES})
    if(isAdmin){
    axiosWithAuth().get("/api/countrylist")
        .then(res => {
            dispatch({type:GET_COUNTRIES_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type:GET_COUNTRIES_ERROR, payload: err})
        })
    } else{
        axiosWithAuth().get(`/api/country/${id}`)
        .then(res => {
            dispatch({type:GET_COUNTRIES_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type:GET_COUNTRIES_ERROR, payload: err})
        })
    }
}

export const getCommunities = () => dispatch => {
    dispatch({type: GETTING_COMMUNITIES})
    axiosWithAuth().get("/api/community")
        .then(res => {
            dispatch({type:GET_COMMUNITIES_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type:GET_COMMUNITIES_ERROR, payload: err})
        })
}

export const getChildren = () => dispatch => {
    dispatch({type: GETTING_CHILDREN})
    axiosWithAuth().get("/api/children")
        .then(res => {
            dispatch({type:GET_CHILDREN_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type:GET_CHILDREN_ERROR, payload: err})
        })
}

export const addCountry = (country) => dispatch => {
    dispatch({type: ADDING_COUNTRY})
    axiosWithAuth().post("/api/country", {country})
        .then(res => {
            dispatch({type:ADD_COUNTRY_SUCCESS, payload: country})
        })
        .catch(err => {
            dispatch({type: ADD_COUNTRY_ERROR, payload: err})
        })
}

export const addCommunity = (community, country_id) => dispatch => {
    dispatch({type: ADDING_COMMUNITY})
    axiosWithAuth().post("/api/community", {community, country_id})
        .then(res => {
            dispatch({type:ADD_COMMUNITY_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type: ADD_COMMUNITY_ERROR, payload: err})
        })
}

export const addChild = (child, community_id) => dispatch => {
    dispatch({type: ADDING_CHILD})
    axiosWithAuth().post("/api/children", {name: child, community_id})
        .then(res => {
            dispatch({type:ADD_CHILD_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type: ADD_CHILD_ERROR, payload: err})
        })
}