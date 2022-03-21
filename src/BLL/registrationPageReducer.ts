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
        case "Registration/SET_LOADER":
            return {...state, loader: action.value}
        case "Registration/SET_SUCCESS_MESSAGE":
            return {...state, successMessage: action.value}
        case "Registration/SET_ERROR":
            return {...state, error: action.errorText}
        default:
            return state
    }
}
// action creators
export const setSuccessMessage = (value: boolean) => ({type: 'Registration/SET_SUCCESS_MESSAGE', value} as const)
export const setLoader = (value: boolean) => ({type: 'Registration/SET_LOADER', value} as const)
export const setError = (errorText: string) => ({
    type: 'Registration/SET_ERROR',
    errorText
} as const)

//thunks
export const requestForRegistrationTC = (email: string, password: string, confirmPassword: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoader(true))
    if (password !== confirmPassword) {
        dispatch(setError('passwords don\'t match!'))
        dispatch(setLoader(false))
    } else {
        registrationApi.registrationUser(email, password)
            .then((response) => {
                if (response.data.error) {
                    dispatch(setError(response.data.error))
                    dispatch(setSuccessMessage(true))
                } else {
                    dispatch(setError(''))
                    dispatch(setSuccessMessage(true))
                    console.log(response.data.addedUser)
                }
            })
            .catch((error: AxiosError) => {
                dispatch(setError(error.response?.data.error ? error.response?.data.error : 'Some error occurred...'))
            })
            .finally(() => {
                dispatch(setLoader(false))
            })
    }
}

//types
type SetSuccessMessageActionType = ReturnType<typeof setSuccessMessage>
type LoaderActionType = ReturnType<typeof setLoader>
type SetErrorActionType = ReturnType<typeof setError>
export type InitialStateType = typeof initialState
type ActionsType = SetSuccessMessageActionType | LoaderActionType | SetErrorActionType
