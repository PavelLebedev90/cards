import {packApi, PacksDataType, PacksFetchDataType, PackType} from '../api/pack-api';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {setFetching, SetFetchingType} from './loginReducer';


let initialPacksState: InitialPacksStateType = {
    packs: {
        cardPacks: [] as PackType[],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,
    },
    packsFetchData: {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '1cardsCount',
        page: 0,
        pageCount: 50,
        user_id: ''
    },
    error: '',
}

export const packsReducer = (state = initialPacksState, action: ActionPacksType): InitialPacksStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {
                ...state,
                packs: {
                    ...state.packs,
                    ...action.payload.packs
                }
            }
        case 'PACKS/SET-PACKS-FETCH-DATA':
            return {
                ...state,
                packsFetchData: {
                    ...state.packsFetchData,
                    ...action.payload.packsFetchData
                }
            }
        case 'PACKS/SET-ERROR':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setPacks = (packs: PacksDataType) => {
    return {
        type: 'PACKS/SET-PACKS',
        payload: {
            packs
        }
    } as const
}

export const setError = (error: string) => {
    return {
        type: 'PACKS/SET-ERROR',
        payload: {
            error
        }
    } as const
}
export const setPacksFetchData = (packsFetchData: PacksFetchDataType) => {
    return {
        type: 'PACKS/SET-PACKS-FETCH-DATA',
        payload: {
            packsFetchData
        }
    } as const
}

export const setUserPacks = (packsFetchData?: PacksFetchDataType) => (
    dispatch: Dispatch<ActionPacksType>
) => {
    dispatch(setFetching(true))
    packApi.getPacks(packsFetchData)
        .then((res) => {
            dispatch(setPacks(res.data))
            packsFetchData && dispatch(setPacksFetchData(packsFetchData))
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        }).finally(() => {
            dispatch(setFetching(false))
        }
    )
}


type InitialPacksStateType = {
    packs: PacksDataType
    packsFetchData: PacksFetchDataType
    error: string
}
type ActionPacksType =
    ReturnType<typeof setPacks>
    | ReturnType<typeof setPacksFetchData>
    | SetFetchingType
    | ReturnType<typeof setError>

