import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true
})

export const authAPI = {
    updateName(model:UpdateUserModelType) {
        return instance.put<AxiosResponse<ResponseType>>(`auth/me/`, model)
    }
}

export type meResponseType = {
    addedUser: AddedUserType
    error?: string
}

export type AddedUserType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified?: boolean
    avatar?: string
    __v: number
    _id: string
}

export type UpdateUserModelType = {
    name: string
    avatar?: string
}