import {Dispatch} from "redux";
import {authAPI, UpdateUserModelType} from "../api/auth-api";

const initialState = {

}


export const profileReducer = (state: ProfileInitialStateType = initialState, action: AllProfileActionsCreatorsType): ProfileInitialStateType => {
    switch(action.type) {
        case "profile/USER_RENAME":
        return {...state, name: action.name}
        default:
            return state
    }
}

//action creators
const userRenameAC = (name: string) => ({type: 'profile/USER_RENAME', name})



//thunks




//types
type UserRenameType = ReturnType<typeof userRenameAC>
export type ProfileInitialStateType = typeof initialState
type AllProfileActionsCreatorsType = UserRenameType