import axios from 'axios';



export const instanceLogin = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const loginApi = {
    login(userData: UserDataType){
        return instanceLogin.post<InitialDataType>('/auth/login', userData)
    }
}


export type UserDataType = {
    email: string
    password: string
    rememberMe: boolean
}


export type InitialDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
