import {CardFetchDataType, cardsApi, CardsDataType, CardType} from "../api/card-api";
import {Dispatch} from "redux";
import {setFetching, SetFetchingType} from "./loginReducer";
import {AxiosError} from 'axios';

const initialState: InitialStateType = {
    cards: {
        cards: [] as Array<CardType>,
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        page: 0,
        pageCount: 0,
        packUserId: '',
    },
    cardsFetchData: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 0,
        sortCards: '0grade',
        page: 0,
        pageCount: 50,
    },
    error: '',
}

export const cardsReducer = (state = initialState, action: ActionsCardsType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {
                ...state,
                cards: {
                    ...state.cards,
                    ...action.payload.cards
                }
            }
        case "CARDS/SET-CARDS-FETCH-DATA":
            return {
                ...state,
                cardsFetchData: {
                    ...state.cardsFetchData,
                    ...action.payload.cardsFetchData
                }
            }
        case "CARDS/SET-ERROR":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//actions

export const setCards = (cards: CardsDataType) => {
    return {
        type: 'CARDS/SET-CARDS',
        payload: {cards}
    } as const
}
export const setError = (error: string) => {
    return {
        type: 'CARDS/SET-ERROR',
        payload: {error}
    } as const
}
export const setCardsFetchData = (cardsFetchData: CardFetchDataType) => {
    return {
        type: 'CARDS/SET-CARDS-FETCH-DATA',
        payload: {cardsFetchData}
    } as const
}

//thunks

export const setUserCards = (cardsFetchData?: CardFetchDataType) => (
    dispatch: Dispatch<ActionsCardsType>
) => {
    dispatch(setFetching(true))
    cardsApi.getCards(cardsFetchData)
        .then((res) => {
            dispatch(setCards(res.data))
            cardsFetchData && dispatch(setCardsFetchData(cardsFetchData))
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setError(error))
        })
        .finally(() => {
                dispatch(setFetching(false))
            }
        )
}

//types
type ActionsCardsType =
    ReturnType<typeof setCards>
    | ReturnType<typeof setCardsFetchData>
    | ReturnType<typeof setError>
    | SetFetchingType


type InitialStateType = {
    cards: CardsDataType
    cardsFetchData: CardFetchDataType
    error: string
}
