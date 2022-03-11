import axios from 'axios';
import {InitialDataType} from './login-api';



export const instanceLogin = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL
        || 'http://localhost:7542/2.0/'
    ,
    withCredentials: true,
})

export const authApi = {
    me(){
        return instanceLogin.post<InitialDataType>('/auth/me',{})
    }
}
