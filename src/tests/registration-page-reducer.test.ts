import {
    InitialStateType,
    registrationPageReducer,
    setErrorActionAC, setLoaderAC,
    setSuccessMessageAC
} from "../BLL/registrationPageReducer";

let startState: InitialStateType
beforeEach(() => {
    startState = {
        successMessage: false,
        loader: false,
        error: ''
    }
})

test('correct error message should be set', () => {
    const action = setErrorActionAC('Error!!!')
    const endAppState = registrationPageReducer(startState, action)
    expect(endAppState.error).toBe('Error!!!')
    expect(endAppState.loader).toBe(false)
    expect(endAppState.successMessage).toBe(false)
});

test('correct successMessage should be set', () => {
    const action = setSuccessMessageAC(true)
    const endAppState = registrationPageReducer(startState, action)
    expect(endAppState.error).toBe('')
    expect(endAppState.loader).toBe(false)
    expect(endAppState.successMessage).toBe(true)
});

test('correct loader should be set', () => {
    const action = setLoaderAC(true)
    const endAppState = registrationPageReducer(startState, action)
    expect(endAppState.error).toBe('')
    expect(endAppState.loader).toBe(true)
    expect(endAppState.successMessage).toBe(false)
});
