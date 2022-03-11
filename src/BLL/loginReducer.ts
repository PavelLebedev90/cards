import {InitialDataType, loginApi, UserDataType} from '../api/login-api';
import {AxiosError} from 'axios';
import {initialization} from './appReducer';


let initialLoginState = {
    user: {},
    isFetching: false,
    error: ''
} as InitialStatetype

export const loginReducer = (state = initialLoginState, action: ActionLoginType): InitialStatetype => {
    switch (action.type) {
        case 'LOGIN/SET-FETCHING':
        case 'LOGIN/SET-ERROR':
            return {
                ...state,
                ...action.payload
            }
        case 'LOGIN/SET-USER-DATA':
            return {
                ...state,
                user: {...action.payload}
            }
        default:
            return state
    }
}
// Action Creators
export const setUserData = (Data = {} as InitialDataType) => {
    return {
        type: 'LOGIN/SET-USER-DATA',
        payload: {
            ...Data
        }
    } as const
}
export const setFetching = (isFetching: boolean) => {
    return {
        type: 'LOGIN/SET-FETCHING',
        payload: {
            isFetching
        }
    } as const
}
export const setError = (error: string) => {
    return {
        type: 'LOGIN/SET-ERROR',
        payload: {
            error
        }
    } as const
}

// Thunk Creators
export const loginUser = (userData: UserDataType) => (
    // dispatch: ThunkDispatch< RootStateType, unknown, ActionLoginType>
    dispatch:any
) => {
    dispatch(setFetching(true))
    loginApi.login(userData)
        .then((res) => {
            dispatch(setUserData(res.data))
            dispatch(initialization())
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        }).finally(() => {
            dispatch(setFetching(false))
        }
    )
}
export const logoutUser = () => (
    // dispatch: ThunkDispatch< RootStateType, unknown, ActionLoginType>
    dispatch:any
) => {
    dispatch(setFetching(true))
    loginApi.logout()
        .then(() => {
            dispatch(setUserData())
            dispatch(initialization())
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        }).finally(() => {
            dispatch(setFetching(false))
        }
    )
}


type ActionLoginType =
    ReturnType<typeof setUserData>
    | ReturnType<typeof setFetching>
    | ReturnType<typeof setError>


type InitialStatetype = {
    user: InitialDataType
    isFetching: boolean
    error: string
}
