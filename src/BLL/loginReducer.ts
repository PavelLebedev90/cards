import {ForgotDataType, InitialDataType, loginApi, NewPasswordDataType, UserDataType} from '../api/login-api';
import {AxiosError} from 'axios';
import {Dispatch} from 'redux';


let initialLoginState: InitialStatetype = {
    user: {} as InitialDataType,
    isFetching: false,
    error: '',
    sendMessage: false,
    sendNewPassword: false
}

export const loginReducer = (state = initialLoginState, action: ActionLoginType): InitialStatetype => {
    switch (action.type) {
        case 'LOGIN/SET-FETCHING':
        case 'LOGIN/SET-ERROR':
        case 'LOGIN/SET-SEND-MESSAGE':
        case 'LOGIN/SET-SEND-NEW-PASSWORD':
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
export const setSendMessage = (sendMessage: boolean) => {
    return {
        type: 'LOGIN/SET-SEND-MESSAGE',
        payload: {
            sendMessage
        }
    } as const
}
export const setSendNewPassword = (sendNewPassword: boolean) => {
    return {
        type: 'LOGIN/SET-SEND-NEW-PASSWORD',
        payload: {
            sendNewPassword
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
            console.log(res)
            dispatch(setSendMessage(true))
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        }).finally(() => {
            dispatch(setFetching(false))
        }
    )
}
export const setUserPassword = (data: NewPasswordDataType) => (
    dispatch: Dispatch<ActionLoginType>
) => {
    dispatch(setFetching(true))
    loginApi.setNewPassword(data)
        .then((res) => {
            console.log(res)
            dispatch(setSendNewPassword(true))
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setError(error))
        }).finally(() => {
            dispatch(setFetching(false))
        }
    )
}

export type SetFetchingType = ReturnType<typeof setFetching>
export type SetUserDataType = ReturnType<typeof setUserData>
type ActionLoginType =
    SetUserDataType
    | SetFetchingType
    | ReturnType<typeof setError>
    | ReturnType<typeof setSendMessage>
    | ReturnType<typeof setSendNewPassword>

type InitialStatetype = {
    user: InitialDataType
    isFetching: boolean
    error: string
    sendMessage: boolean
    sendNewPassword: boolean
}
