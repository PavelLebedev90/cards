import {packApi, PacksDataType, PackType} from '../api/pack-api';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';


let initialPacksState:InitialPacksStateType = {
    packs: {
        cardPacks: [] as PackType[],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,
    }
}

export const packsReducer = (state = initialPacksState, action: ActionPacksType):InitialPacksStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {
                ...state,
                packs: {
                    ...state.packs,
                    ...action.payload.packs
                }
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

export const setUserPacks = () => (
    dispatch: Dispatch<ActionPacksType>
) => {
    // dispatch(setFetching(true))
    packApi.getPacks()
        .then((res) => {
            dispatch(setPacks(res.data))
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            // dispatch(setError(error))
        }).finally(() => {
            // dispatch(setFetching(false))
        }
    )
}


type InitialPacksStateType = {
    packs: PacksDataType
}
type ActionPacksType = ReturnType<typeof setPacks>
