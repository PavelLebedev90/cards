import {applyMiddleware, combineReducers, createStore} from 'redux';
import {cardsReducer} from './cardsReducer';
import thunk from 'redux-thunk';
import {loginReducer} from './loginReducer';
import {registrationPageReducer} from "./registrationPageReducer";

const rootReducer = combineReducers({
    cards: cardsReducer,
    login: loginReducer,
    registration: registrationPageReducer
})

export type RootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))
