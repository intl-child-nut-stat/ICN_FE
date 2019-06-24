import axios from "axios"

export default function(){
    const token = localStorage.getItem("token")
    return axios.create({
        headers: {
            'Authorization': token},
        baseURL: 'https://child-nutrition.herokuapp.com'
    })
}

export const axiosInstance = () =>{
    return axios.create({
        baseURL: 'https://child-nutrition.herokuapp.com'
    })
}