import axios from 'axios';

export const instanceCard = axios.create({
    baseURL:
    // 'https://neko-back.herokuapp.com/2.0'
        process.env.REACT_APP_BACK_URL
        || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const cardsApi = {
    getCards(cardsFetchData: CardFetchDataType = {} as CardFetchDataType) {
        return instanceCard.get<CardsDataType>(`/cards/card`, {params: cardsFetchData})
    }
}


export type CardFetchDataType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: Date
    updated: Date
    _id: string
}

export type CardsDataType =  {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
