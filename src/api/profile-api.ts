import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true
})

export const profileAPI = {
    updateUser(model:UpdateUserModelType) {
        return instance.put<AxiosResponse<meResponseType>>('auth/me', model)
    },
    setUser() {
        return instance.post('auth/me')
    }
}

export type meResponseType = {
    updatedUser: AddedUserType
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