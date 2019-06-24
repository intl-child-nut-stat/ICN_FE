import axios from "axios"

export default function(){
    const token = localStorage.getItem("token")
    return axios.create({
        headers: {
            'Authorization': token},
        baseURL: 'https://test-jeremiah.herokuapp.com/'
    })
}

export const axiosInstance = () =>{
    return axios.create({
        baseURL: 'https://test-jeremiah.herokuapp.com/'
    })
}