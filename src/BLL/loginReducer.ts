import {InitialDataType, loginApi, UserDataType} from '../api/login-api';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';


let initialLoginState = {
    isFetching: false,
    error: ''
} as InitialStatetype

export const loginReducer = (state = initialLoginState, action: ActionLoginType): InitialStatetype => {
    switch (action.type) {
        case 'LOGIN/SET-USER-DATA':
        case 'LOGIN/SET-FETCHING':
        case 'LOGIN/SET-ERROR':
            console.log(action.payload)
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
// Action Creators
export const setUserData = (Data: InitialDataType) => {
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
export const loginUser = (userData: UserDataType) => (dispatch: Dispatch<ActionLoginType>) => {
    dispatch(setFetching(true))
    loginApi.login(userData)
        .then((res) => {
            console.log(res.data)
            dispatch(setUserData(res.data))
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

type InitialStatetype = InitialDataType & {
    isFetching: boolean
    error: string
}
