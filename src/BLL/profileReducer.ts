import {Dispatch} from "redux";
import {AddedUserType, authAPI, meResponseType} from "../api/auth-api";


const initialState = {
    profile: {},
    loader: false,
    error: '',
}


export const profileReducer = (state: ProfileInitialStateType = initialState, action: AllProfileActionsCreatorsType): ProfileInitialStateType => {
    switch (action.type) {
        case "PROFILE/SET_PROFILE":
            return {...state, profile: action.payload}
        case "PROFILE/SET_ERROR": {
            return {...state, error: action.payload}
        }
        case "PROFILE/SET_LOADER":
            return {...state, loader: action.payload}
        default:
            return state
    }
}

//actions
export const setProfileAC = (profile: meResponseType) => ({type: 'PROFILE/SET_PROFILE', payload: {profile}} as const)
export const setErrorAC = (error: string) => ({type: 'PROFILE/SET_ERROR', payload: error} as const)
export const setLoaderAC = (value: boolean) => ({type: 'PROFILE/SET_LOADER', payload: value} as const)
//thunks
const updateUserNameTc = (newNickname: string) => (dispatch: Dispatch) => {
    dispatch(setLoaderAC(true))
    let updateModel = {
        name: newNickname,
        avatar: ''
    }
    authAPI.updateName(updateModel)
        .then((res) => {
            const updatedUser = res.data.request
            dispatch(setProfileAC(updatedUser))
            dispatch(setLoaderAC(true))
        })
        .catch((err) => {
            dispatch(setErrorAC(err.res?.data.error ? err.res?.data.error : 'Some error occurred'))
        })
        .finally(() => {
            dispatch(setLoaderAC(false))
        })
}


//types
type UserRenameType = ReturnType<typeof setProfileAC>
type SetErrorType = ReturnType<typeof setErrorAC>
type SetLoaderType = ReturnType<typeof setLoaderAC>
type AllProfileActionsCreatorsType =
    | UserRenameType
    | SetErrorType
    | SetLoaderType

export type ProfileInitialStateType = typeof initialState
