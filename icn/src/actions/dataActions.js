import axiosWithAuth from '../utils/axiosWithAuth'

export const GETTING_COUNTRIES = "GETTING_COUNTRIES"
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS"
export const GET_COUNTRIES_ERROR = "GET_COUNTRIES_ERROR"

export const GETTING_COMMUNITIES = "GETTING_COMMUNITIES"
export const GET_COMMUNITIES_SUCCESS = "GET_COMMUNITIES_SUCCESS"
export const GET_COMMUNITIES_ERROR = "GET_COMMUNITIES_ERROR"

export const getCountries = (isAdmin, id) => dispatch => {
    dispatch({type: GETTING_COUNTRIES})
    if(isAdmin === "true" || isAdmin === true){
    axiosWithAuth().get("https://child-nutrition.herokuapp.com/api/countrylist")
        .then(res => {
            dispatch({type:GET_COUNTRIES_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type:GET_COUNTRIES_ERROR, payload: err})
        })
    } else{
        axiosWithAuth().get(`https://child-nutrition.herokuapp.com/api/country/${id}`)
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
    axiosWithAuth().get("https://child-nutrition.herokuapp.com/api/community")
        .then(res => {
            let desiredCommunities = res.data.filter(community => community.country_id === Number(id))
            dispatch({type:GET_COMMUNITIES_SUCCESS, payload: desiredCommunities})
        })
        .catch(err => {
            dispatch({type:GET_COMMUNITIES_ERROR, payload: err})
        })
    }
