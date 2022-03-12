import {Dispatch} from "redux";
import {profileAPI, meResponseType, UpdateUserModelType} from "../api/profile-api";


const initialState = {
    name: '',
    avatar: '',
    loader: false,
    error: '',
    isLoggedIn: false
}


export const profileReducer = (state: ProfileInitialStateType = initialState, action: AllProfileActionsCreatorsType): ProfileInitialStateType => {
    switch (action.type) {
        case "PROFILE/SET_USER":
            return {
                ...state,
                name: action.payload.name,
                avatar: action.payload.avatar
            }
        case 'PROFILE/UPDATE_NAME':
            return {...state, name: action.payload.name}
        case 'PROFILE/UPDATE_AVATAR':
            return {...state, avatar: action.payload.avatar}
        case 'PROFILE/SET_ERROR': {
            return {...state, error: action.payload}
        }
        case 'PROFILE/SET_LOADER':
            return {...state, loader: action.payload}
        case "PROFILE/IS_LOGGED_IN":
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state
    }
}

//actions
export const setUserAC = (name: string, avatar: string) => ({
    type: 'PROFILE/SET_USER',
    payload: {name, avatar}
} as const)
export const updateNameAC = (name: string) => ({type: 'PROFILE/UPDATE_NAME', payload: {name}} as const)
export const updateAvatarAC = (avatar: string) => ({type: 'PROFILE/UPDATE_AVATAR', payload: {avatar}} as const)
export const setErrorAC = (error: string) => ({type: 'PROFILE/SET_ERROR', payload: error} as const)
export const setLoaderAC = (value: boolean) => ({type: 'PROFILE/SET_LOADER', payload: value} as const)
export const isLoggedInAC = (isLoggedIn: boolean) => ({type: 'PROFILE/IS_LOGGED_IN', payload: {isLoggedIn}} as const)
//thunks
export const fetchUserTC = () => (dispatch: Dispatch) => {
    profileAPI.setUser()
        .then((res) => {
            if (res.data) {
                dispatch(setUserAC(res.data.name, res.data.avatar))
                dispatch(isLoggedInAC(true))
            }
        })
        .catch((rej) => {
            console.log('you are not logged in')
        })
}

export const updateUserNameTC = (update: UpdateUserModelType) => (dispatch: Dispatch) => {
    dispatch(setLoaderAC(true))
    profileAPI.updateUser(update)
        .then((res) => {
            dispatch(updateNameAC(res.data.data.updatedUser.name))
            dispatch(updateAvatarAC(res.data.data.updatedUser.avatar ? res.data.data.updatedUser.avatar : ''))
        })
        .catch((err) => {
            dispatch(setErrorAC(err.res?.data.error ? err.res?.data.error : 'Some error occurred'))
        })
        .finally(() => {
            dispatch(setLoaderAC(false))
        })
}


//types
type SetUserType = ReturnType<typeof setUserAC>
type updateNameType = ReturnType<typeof updateNameAC>
type SetErrorType = ReturnType<typeof setErrorAC>
type SetLoaderType = ReturnType<typeof setLoaderAC>
type updateAvatarType = ReturnType<typeof updateAvatarAC>
type IsLoggedInType = ReturnType<typeof isLoggedInAC>
type AllProfileActionsCreatorsType =
    | updateNameType
    | SetErrorType
    | SetLoaderType
    | updateAvatarType
    | SetUserType
    | IsLoggedInType

export type ProfileInitialStateType = typeof initialState
