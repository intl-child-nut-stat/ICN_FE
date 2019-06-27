import axiosWithAuth from '../utils/axiosWithAuth'

export const ADDING_DATA = "ADDING_DATA"
export const ADD_DATA_SUCCESS = "ADD_DATA_SUCCESS"
export const ADD_DATA_ERROR = "ADD_DATA_ERROR"

export const DELETING_DATA = "DELETING_DATA"
export const DELETE_DATA_SUCCESS = "DELETE_DATA_SUCCESS"
export const DELETE_DATA_ERROR = "DELETE_DATA_ERROR"

export const UPDATING_DATA = "UPDATING_DATA"
export const UPDATE_DATA_SUCCESS = "UPDATE_DATA_SUCCESS"
export const UPDATE_DATA_ERROR = "UPDATE_DATA_ERROR"

export const GETTING_DATA = "GETTING_DATA"
export const GET_DATA_SUCCESS="GET_DATA_SUCCESS"
export const GET_DATA_ERROR="GET_DATA_ERROR"

export const SET_CHILD_NAME="SET_CHILD_NAME"


export const getData =(url, dataType) => dispatch => {
    dispatch({type: GETTING_DATA})
    axiosWithAuth().get(`${url}`)
        .then(res => {
            dispatch({type: GET_DATA_SUCCESS, payload: res.data, data: dataType})
        })
        .catch(err => {
            dispatch({type: GET_DATA_ERROR, payload: err})
        })
}

export const addData = (url, object, dataType) => dispatch => {
    console.log(url, object, dataType)
    dispatch({type: ADDING_DATA})
    axiosWithAuth().post(`${url}`, object)
        .then(res => {
            let output = res.data
            if(dataType==="country")
                output=res.data[0]
            dispatch({type: ADD_DATA_SUCCESS, payload: output, data: dataType})
            
        })
        .catch(err => {
            console.log(err)
            dispatch({type:ADD_DATA_ERROR})
        })
}

export const deleteData = (url, id, dataType) => dispatch => {
    dispatch({type: DELETING_DATA})
    axiosWithAuth().delete(`${url}${id}`)
        .then(res => {
            dispatch({type: DELETE_DATA_SUCCESS, payload: id, data: dataType})
        })
        .catch(err => {
            console.log(err)
            dispatch({type: DELETE_DATA_ERROR})
        })
}

export const updateData = (url, id, object, dataType) => dispatch => {
    dispatch({type: UPDATING_DATA})
    axiosWithAuth().put(`${url}${id}`, object)
        .then(res => {
            dispatch({type: UPDATE_DATA_SUCCESS, payload: id, data: dataType, newObj: {...object, id}})
        })
        .catch(err => {
            console.log(err)
            dispatch({type: UPDATE_DATA_ERROR})
        })
}

export const getChildName = (id) => dispatch => {
    dispatch({type: SET_CHILD_NAME, payload: id})
}
