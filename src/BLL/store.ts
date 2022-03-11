import {applyMiddleware, combineReducers, createStore} from 'redux';
import {cardsReducer} from './cardsReducer';
import thunk from 'redux-thunk';
import {loginReducer} from './loginReducer';
import {registrationPageReducer} from "./registrationPageReducer";
import {profileReducer} from "./profileReducer";
import {appReducer} from './appReducer';

const rootReducer = combineReducers({
    cards: cardsReducer,
    login: loginReducer,
    registration: registrationPageReducer,
    profile: profileReducer,
    app: appReducer
})

export type RootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store
