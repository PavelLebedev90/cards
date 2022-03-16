import axios from 'axios';
import {instanceLogin} from './auth-api';


export const instancePack = axios.create({
    baseURL:
    // 'https://neko-back.herokuapp.com/2.0'
        process.env.REACT_APP_BACK_URL
        || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const packApi = {
    getPacks(packsFetchData: PacksFetchDataType = {} as PacksFetchDataType){
        // return instanceLogin.get<PacksDataType>(`/cards/pack?pageCount=${50}`)
        return instanceLogin.get<PacksDataType>(`/cards/pack`,{params: packsFetchData})
    }
}

export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: Date
    updated: Date
    user_name:string
}
export type PacksDataType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type PacksFetchDataType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}



