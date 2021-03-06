import {CardFetchDataType, cardsApi, CardsDataType, CardType, GradeCardType, UpdatedGradeType} from '../api/card-api';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {RootStateType} from './store';
import {ThunkDispatch} from 'redux-thunk';

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
    isLoading: false,
    anotherUser: true,
}

export const cardsReducer = (state = initialState, action: ActionsCardsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    ...action.payload.cards
                }
            }
        case 'CARDS/SET-CARDS-FETCH-DATA':
            return {
                ...state,
                cardsFetchData: {
                    ...state.cardsFetchData,
                    ...action.payload.cardsFetchData
                }
            }
        case 'CARDS/SET-ERROR':
            return {
                ...state,
                ...action.payload
            }
        case 'CARDS/SET-FETCH':
            return {
                ...state,
                ...action.payload
            }
        case 'CARDS/SET-ANOTHER-USER':
            return {
                ...state,
                ...action.payload
            }
        case 'CARDS/SET-CARDS-PACK-ID':
            return {
                ...state,
                cardsFetchData: {...state.cardsFetchData, cardsPack_id: action.payload.cardsPack_id}
            }
        case 'CARDS/SET-GRADE-CARD':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    cards: state.cards.cards.map(card=> card._id === action.payload.card._id
                        ? {...card, grade: action.payload.card.grade}:card)
                }
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
export const setFetchingCardsList = (isLoading: boolean) => {
    return {
        type: 'CARDS/SET-FETCH',
        payload: {isLoading}
    } as const
}
export const setCardsFetchData = (cardsFetchData: CardFetchDataType) => {
    return {
        type: 'CARDS/SET-CARDS-FETCH-DATA',
        payload: {cardsFetchData}
    } as const
}
export const setAnotherUser = (anotherUser: boolean) => {
    return {
        type: 'CARDS/SET-ANOTHER-USER',
        payload: {anotherUser}
    } as const
}
export const setCardsPackId = (cardsPack_id: string) => {
    return {
        type: 'CARDS/SET-CARDS-PACK-ID',
        payload: {cardsPack_id}
    } as const
}
export const setGradeCard = (card: UpdatedGradeType) => {
    return {
        type: 'CARDS/SET-GRADE-CARD',
        payload: {
            card
        }
    } as const
}
//thunks

export const getUserCards = () => (
    dispatch: Dispatch<ActionsCardsType>, getState: () => RootStateType
) => {
    const cardsFetchData = getState().cards.cardsFetchData
    const userId = getState().login.user._id
    dispatch(setFetchingCardsList(true))
    cardsApi.getCards(cardsFetchData)
        .then((res) => {
            const packUserId = res.data.packUserId
            userId === packUserId && dispatch(setAnotherUser(false))
            dispatch(setCards(res.data))
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setError(error))
        })
        .finally(() => {
                dispatch(setFetchingCardsList(false))
            }
        )
}

export const addCard = (question: string, answer: string) => (
    dispatch: ThunkDispatch<RootStateType, unknown, ActionsCardsType>,
    getState: () => RootStateType
) => {
    dispatch(setFetchingCardsList(true))
    const cardsPackId = getState().cards.cardsFetchData.cardsPack_id
    const cardsPackData = {
        cardsPack_id: cardsPackId,
        question: question,
        answer: answer,
        grade: 0,
        shots: 0,
        answerImg: '',
        questionImg: '',
        questionVideo: '',
        answerVideo: '',
    }
    cardsApi.postNewCard(cardsPackData)
        .then(() => {
            dispatch(getUserCards())
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        })
        .finally(() => {
            dispatch(setFetchingCardsList(false))
        })
}

export const setGradeInTheSelectedCard = (card: GradeCardType) => (
    dispatch: ThunkDispatch<RootStateType, unknown, ActionsCardsType>,
) => {
    dispatch(setFetchingCardsList(true))
    cardsApi.changeGrade(card)
        .then((res) => {
            dispatch(setGradeCard(res.data))
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        })
        .finally(() => {
            dispatch(setFetchingCardsList(false))
        })
}

export const changeCard = (
    card: CardType
) => (
    dispatch: ThunkDispatch<RootStateType, unknown, ActionsCardsType>
) => {
    dispatch(setFetchingCardsList(true))
    cardsApi.changeCard(card)
        .then(() => {
            dispatch(getUserCards())
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        })
        .finally(() => {
            dispatch(setFetchingCardsList(false))
        })
}
export const deleteCard = (id: string) => (
    dispatch: ThunkDispatch<RootStateType, unknown, ActionsCardsType>) => {
    dispatch(setFetchingCardsList(true))
    cardsApi.deleteCard(id)
        .then(() => {
            dispatch(getUserCards())
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        })
        .finally(() => {
            dispatch(setFetchingCardsList(false))
        })
}

//types
type ActionsCardsType =
    ReturnType<typeof setCards>
    | ReturnType<typeof setCardsFetchData>
    | ReturnType<typeof setError>
    | ReturnType<typeof setFetchingCardsList>
    | ReturnType<typeof setAnotherUser>
    | ReturnType<typeof setCardsPackId>
    | ReturnType<typeof setGradeCard>


export type InitialStateType = {
    cards: CardsDataType
    cardsFetchData: CardFetchDataType
    error: string
    isLoading: boolean
    anotherUser: boolean
}
