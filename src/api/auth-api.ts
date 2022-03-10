import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true
})

export const authAPI = {
    updateName(userId: string, model:UpdateUserModelType) {
        return instance.put<UpdateUserModelType, AxiosResponse<ResponseType>>(`auth/me/${userId}`, model)
    }
}

type ResponseType = {
    addedUser: AddedUserType
    error?: string
}

type AddedUserType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
}

export type UpdateUserModelType = {
    name: string
    avatar: string
}