import {applyMiddleware, combineReducers, createStore} from 'redux';
import {cardsReducer} from './cardsReducer';
import thunk from 'redux-thunk';
import {loginReducer} from './loginReducer';

const rootReducer = combineReducers({
    cards: cardsReducer,
    login: loginReducer
})

export type RootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))
