import axios from 'axios';



export const instancePack = axios.create({
    baseURL:
    // 'https://neko-back.herokuapp.com/2.0',
        process.env.REACT_APP_BACK_URL
        || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const packApi = {
    getPacks: function (packsFetchData: PacksFetchDataType = {} as PacksFetchDataType){
        return instancePack.get<PacksDataType>(`/cards/pack`,{params: packsFetchData})
    },
    addPack: function (name:string){
        return instancePack.post('/cards/pack', {cardsPack: {name: name}})
    },
    changePack: function (packId:string, newName:string){
        return instancePack.put('/cards/pack',
            {cardsPack: {
                _id: packId,
                    name: newName
                }})
    },
    deletePack: function (packId:string){
        return instancePack.delete(`/cards/pack?id=${packId}`)
    }
}
export type PackApiKeys = 'addPack' | 'changePack' | 'deletePack'
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




