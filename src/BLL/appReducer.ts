import {authApi} from '../api/auth-api';
import {AxiosError} from 'axios';
import {setUserData, SetUserDataType} from './loginReducer';
import {Dispatch} from 'redux';

const initialState = {
    isLoggedIn: false,
    isInitialization: false,
    error: null as null | string
}

export const appReducer = (state = initialState, action: ActionAppType) => {
    switch (action.type) {
        case 'APP/INITIALIZATION':
        case 'APP/LOGED-IN':
        case 'APP/ERROR':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setloggedIn = (isLoggedIn:boolean)=>{
    return {
        type: 'APP/LOGED-IN',
        payload:{
            isLoggedIn
        }
    } as const
}
export const setInitialization = (isInitialization:boolean)=>{
    return {
        type: 'APP/INITIALIZATION',
        payload:{
            isInitialization
        }
    } as const
}
export const setError = (error:null | string)=>{
    return {
        type: 'APP/ERROR',
        payload:{
            error
        }
    } as const
}

export const initialization = ()=>(
    dispatch: Dispatch<ActionAppType>
)=>{
    authApi.me()
        .then((res)=>{
            if(res.data._id){
                dispatch(setloggedIn(true))
                dispatch(setError(null))
                dispatch(setUserData(res.data))
            }
        })
        .catch((e:AxiosError)=>{
            dispatch(setloggedIn(false))
            dispatch(setError(e.response?.data.error))
        })
        .finally(()=>{
            dispatch(setInitialization(true))
        })
}

export type ActionAppType =
    ReturnType<typeof setloggedIn>
| ReturnType<typeof setInitialization>
| ReturnType<typeof setError>
| SetUserDataType
