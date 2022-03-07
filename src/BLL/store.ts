import {applyMiddleware, combineReducers, createStore} from 'redux';
import {cardsReducer} from './cardsReducer';
import thunk from 'redux-thunk';
import {registrationPageReducer} from "./registrationPageReducer";

const rootReducer = combineReducers({
    cards: cardsReducer,
    registration: registrationPageReducer
})

export type RootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))
