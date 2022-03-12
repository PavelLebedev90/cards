import {ForgotDataType, InitialDataType, loginApi, UserDataType} from '../api/login-api';
import {AxiosError} from 'axios';
import {Dispatch} from 'redux';


let initialLoginState:InitialStatetype = {
    user: {} as InitialDataType,
    isFetching: false,
    error: ''
}

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
    dispatch: Dispatch<ActionLoginType>
) => {
    dispatch(setFetching(true))
    loginApi.login(userData)
        .then((res) => {
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
export const logoutUser = () => (
    dispatch: Dispatch<ActionLoginType>
) => {
    dispatch(setFetching(true))
    loginApi.logout()
        .then(() => {
            dispatch(setUserData())
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        }).finally(() => {
            dispatch(setFetching(false))
        }
    )
}
export const forgotUserPassword = (data: ForgotDataType) => (
    dispatch: Dispatch<ActionLoginType>
) => {
    dispatch(setFetching(true))
    loginApi.forgotPassword(data)
        .then((res) => {
            // dispatch(setUserData())
            console.log(res)
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        }).finally(() => {
            dispatch(setFetching(false))
        }
    )
}



export type SetUserDataType = ReturnType<typeof setUserData>
type ActionLoginType =
    SetUserDataType
    | ReturnType<typeof setFetching>
    | ReturnType<typeof setError>


type InitialStatetype = {
    user: InitialDataType
    isFetching: boolean
    error: string
}
