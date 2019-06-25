import axiosWithAuth from '../utils/axiosWithAuth'

export const GETTING_COUNTRIES = "GETTING_COUNTRIES"
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS"
export const GET_COUNTRIES_ERROR = "GET_COUNTRIES_ERROR"

export const GETTING_COMMUNITIES = "GETTING_COMMUNITIES"
export const GET_COMMUNITIES_SUCCESS = "GET_COMMUNITIES_SUCCESS"
export const GET_COMMUNITIES_ERROR = "GET_COMMUNITIES_ERROR"

export const ADDING_COUNTRY = "ADDING_COUNTRY"
export const ADD_COUNTRY_SUCCESS = "ADD_COUNTRY_SUCCESS"
export const ADD_COUNTRY_ERROR = "ADD_COUNTRY_ERROR"

export const ADDING_COMMUNITY = "ADDING_COMMUNITY"
export const ADD_COMMUNITY_SUCCESS = "ADD_COMMUNITY_SUCCESS"
export const ADD_COMMUNITY_ERROR = "ADD_COMMUNITY_ERROR"

export const getCountries = (isAdmin, id) => dispatch => {
    dispatch({type: GETTING_COUNTRIES})
    if(isAdmin === "true" || isAdmin === true){
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

export const getCommunities = (id) => dispatch => {
    dispatch({type: GETTING_COMMUNITIES})
    axiosWithAuth().get("/api/community")
        .then(res => {
            let desiredCommunities = res.data.filter(community => community.country_id === Number(id))
            dispatch({type:GET_COMMUNITIES_SUCCESS, payload: desiredCommunities})
        })
        .catch(err => {
            dispatch({type:GET_COMMUNITIES_ERROR, payload: err})
        })
    }

export const addCountry = (country) => dispatch => {
    dispatch({type: ADDING_COUNTRY})
    axiosWithAuth().post("/api/country", {country})
        .then(res => {
            console.log('it worked', res)
            dispatch({type:ADD_COUNTRY_SUCCESS, payload: country})
        })
        .catch(err => {
            console.log('stupid error', err)
            dispatch({type: ADD_COUNTRY_ERROR, payload: err})
        })
}

export const addCommunity = (community, country_id) => dispatch => {
    dispatch({type: ADDING_COMMUNITY})
    axiosWithAuth().post("/api/community", {community, country_id})
        .then(res => {
            console.log(res)
            dispatch({type:ADD_COMMUNITY_SUCCESS, payload: res.data})
        })
        .catch(err => {
            console.log('stupid error', err)
            dispatch({type: ADD_COMMUNITY_ERROR, payload: err})
        })
}