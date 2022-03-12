import axios from 'axios';



export const instanceLogin = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0'
        // process.env.REACT_APP_BACK_URL
        || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const loginApi = {
    login(userData: UserDataType){
        return instanceLogin.post<InitialDataType>('/auth/login', userData)
    },
    logout(){
        return instanceLogin.delete('/auth/me')
    },
    forgotPassword(forgotData:ForgotDataType){
        return instanceLogin.post('/auth/forgot',forgotData)
    }
}

export type ForgotDataType = {
    email: string
    from: string
    message: string
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
