import axiosWithAuth from '../utils/axiosWithAuth'

export const GETTING_COUNTRIES = "GETTING_COUNTRIES"
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS"
export const GET_COUNTRIES_ERROR = "GET_COUNTRIES_ERROR"

export const getCountries = () => dispatch => {
    dispatch({type: GETTING_COUNTRIES})
    axiosWithAuth().get("https://child-nutrition.herokuapp.com/api/countrylist")
        .then(res => {
            dispatch({type:GET_COUNTRIES_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type:GET_COUNTRIES_ERROR, payload: err})
        })
}