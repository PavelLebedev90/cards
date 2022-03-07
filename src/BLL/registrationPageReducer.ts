import {registrationApi} from "../api/registration-api";
import {AxiosError} from "axios";
import {Dispatch} from "redux";

const initialState = {
    successMessage: false,
    loader: false,
    error: ''
}

export const registrationPageReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "registration/SET_LOADER":
            return {...state, loader: action.value}
        case "registration/SET_SUCCESS_MESSAGE":
            return {...state, successMessage: action.value}
        case "registration/SET_ERROR":
            return {...state, error: action.errorText}
        default:
            return state
    }
}
// action creators
export const setSuccessMessageAC = (value: boolean) => ({type: 'registration/SET_SUCCESS_MESSAGE', value} as const)
export const setLoaderAC = (value: boolean) => ({type: 'registration/SET_LOADER', value} as const)
export const setErrorActionAC = (errorText: string) => ({
    type: 'registration/SET_ERROR',
    errorText
} as const)

//thunks
export const requestForRegistrationTC = (email: string, password: string, confirmPassword: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoaderAC(true))
    if (password !== confirmPassword) {
        dispatch(setErrorActionAC('passwords don\'t match!'))
        dispatch(setLoaderAC(false))
    } else {
        registrationApi.registrationUser(email, password)
            .then(() => {
                dispatch(setErrorActionAC(''))
                dispatch(setSuccessMessageAC(true))
            })
            .catch((error: AxiosError) => {
                dispatch(setErrorActionAC(error.response?.data.error))
            })
            .finally(() => {
                dispatch(setLoaderAC(false))
            })
    }
}

//types
type SetSuccessMessageActionType = ReturnType<typeof setSuccessMessageAC>
type LoaderActionType = ReturnType<typeof setLoaderAC>
type SetErrorActionType = ReturnType<typeof setErrorActionAC>
export type InitialStateType = typeof initialState
type ActionsType = SetSuccessMessageActionType | LoaderActionType | SetErrorActionType
