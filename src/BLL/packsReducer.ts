import {packApi, PackApiKeys, PacksDataType, PacksFetchDataType, PackType} from '../api/pack-api';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {RootStateType} from './store';
import {ThunkDispatch} from 'redux-thunk';


let initialPacksState: InitialPacksStateType = {
    packs: {
        cardPacks: [] as PackType[],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 0,
    },
    packsFetchData: {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '1cardsCount',
        page: 1,
        pageCount: 10,
        user_id: ''
    },
    error: '',
    isFetching: false,
}

export const packsReducer = (state = initialPacksState, action: ActionPacksType): InitialPacksStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {
                ...state,
                packs: {
                    ...state.packs,
                    ...action.payload.packs
                },
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
        case 'PACKS/SET-FETCHING':
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
export const setFetching = (isFetching: boolean) => {
    return {
        type: 'PACKS/SET-FETCHING',
        payload: {
            isFetching
        }
    } as const
}
export const setUserPacks = () => (
    dispatch: Dispatch<ActionPacksType>,
    getState: () => RootStateType
) => {
    dispatch(setFetching(true))
    const packsFetchData = getState().packs.packsFetchData
    packApi.getPacks(packsFetchData)
        .then((res) => {
            dispatch(setPacks(res.data))
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        }).finally(() => {
            dispatch(setFetching(false))
        }
    )
}
export const changeUserPack = (keyApi:PackApiKeys, arg:string) => (
    dispatch: ThunkDispatch<RootStateType, unknown, ActionPacksType>
) => {
    dispatch(setFetching(true))
    packApi[keyApi](arg)
        .then(() => {
            dispatch(setUserPacks())
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
    isFetching: boolean,
}
type ActionPacksType =
    ReturnType<typeof setPacks>
    | ReturnType<typeof setPacksFetchData>
    | ReturnType<typeof setFetching>
    | ReturnType<typeof setError>

