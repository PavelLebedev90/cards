import {applyMiddleware, combineReducers, createStore} from 'redux';
import {cardsReducer} from './cardsReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    cards: cardsReducer
})

export type RootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))
