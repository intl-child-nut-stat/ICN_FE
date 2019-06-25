import axiosWithAuth from '../utils/axiosWithAuth'

export const GETTING_COUNTRIES = "GETTING_COUNTRIES"
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS"
export const GET_COUNTRIES_ERROR = "GET_COUNTRIES_ERROR"

export const getCountries = (isAdmin, id) => dispatch => {
    console.log(isAdmin, id)
    dispatch({type: GETTING_COUNTRIES})
    if(isAdmin === 'true'){
        console.log('admin')
    axiosWithAuth().get("https://child-nutrition.herokuapp.com/api/countrylist")
        .then(res => {
            console.log(res)
            dispatch({type:GET_COUNTRIES_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type:GET_COUNTRIES_ERROR, payload: err})
        })
    } else{
        console.log('nonAdmin')
        axiosWithAuth().get(`https://child-nutrition.herokuapp.com/api/country/${id}`)
        .then(res => {
            console.log(res)
            dispatch({type:GET_COUNTRIES_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type:GET_COUNTRIES_ERROR, payload: err})
        })
    }
}