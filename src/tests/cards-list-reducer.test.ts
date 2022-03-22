import {CardFetchDataType, CardType} from "../api/card-api";
import {
    cardsReducer,
    InitialStateType,
    setAnotherUser,
    setCards, setCardsFetchData,
    setCardsPackId,
    setError,
    setFetchingCardsList
} from "../BLL/cardsReducer";

let startState: InitialStateType
beforeEach(() => {
    startState = {
        cards: {
            cards: [] as Array<CardType>,
            cardsTotalCount: 0,
            maxGrade: 0,
            minGrade: 0,
            page: 0,
            pageCount: 0,
            packUserId: '',
        },
        cardsFetchData: {
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: '',
            min: 0,
            max: 0,
            sortCards: '0grade',
            page: 0,
            pageCount: 50,
        },
        error: '',
        isLoading: false,
        anotherUser: false,
    }
})

test('correct error message should be set', () => {
    const action = setError('Error!!!')
    const endAppState = cardsReducer(startState, action)
    expect(endAppState.error).toBe('Error!!!')
    expect(endAppState.isLoading).toBe(false)
    expect(endAppState.anotherUser).toBe(false)
});

test('correct cardsPackId should be set', () => {
    const action = setCardsPackId('12321')
    const endAppState = cardsReducer(startState, action)
    expect(endAppState.cardsFetchData.cardsPack_id).toBe('12321')
    expect(endAppState.cardsFetchData.cardAnswer).toBe('')
    expect(endAppState.cardsFetchData.cardQuestion).toBe('')

});

test('correct data AnotherUser should be set', () => {
    const action = setAnotherUser(true)
    const endAppState = cardsReducer(startState, action)
    expect(endAppState.anotherUser).toBe(true)
    expect(endAppState.error).toBe('')
    expect(endAppState.isLoading).toBe(false)
});

test('correct data isLoading should be set', () => {
    const action = setFetchingCardsList(true)
    const endAppState = cardsReducer(startState, action)
    expect(endAppState.anotherUser).toBe(false)
    expect(endAppState.error).toBe('')
    expect(endAppState.isLoading).toBe(true)
});

test('correct data cards should be set', () => {
    const card: CardType = {
        answer: 'test answer',
        question: 'test question',
        cardsPack_id: 'test cardsPack id',
        grade: 10,
        shots: 11,
        user_id: 'user id test',
        created: new Date('2020-05-13T10:05:44.867Z'),
        updated: new Date('"2020-05-13T11:05:44.867Z"'),
        _id: 'testid',
    }
    const action = setCards({
        cards: [card],
        cardsTotalCount: 45,
        maxGrade: 83,
        minGrade: 33,
        page: 4,
        pageCount: 7,
        packUserId: 'test',
    })
    const endAppState = cardsReducer(startState, action)
    expect(endAppState.cards.cards.length).toBe(1)
    expect(endAppState.cards.pageCount).toBe(7)
    expect(endAppState.cards.maxGrade).toBe(83)
    expect(endAppState.cards.minGrade).toBe(33)
    expect(endAppState.cards.page).toBe(4)
    expect(endAppState.cards.packUserId).toBe('test')
});

test('correct data CardsFetch should be set', () => {
    const cardsFetchData: CardFetchDataType = {
        cardAnswer: 'test answer',
        cardQuestion: 'test question',
        cardsPack_id: 'test cardsPack id',
        min: 5,
        max: 10,
        sortCards: '1grade',
        page: 6,
        pageCount: 40,
    }
    const action = setCardsFetchData(cardsFetchData)
    const endAppState = cardsReducer(startState, action)
    expect(endAppState.cardsFetchData.cardsPack_id).toBe('test cardsPack id')
    expect(endAppState.cardsFetchData.cardAnswer).toBe('test answer')
    expect(endAppState.cardsFetchData.cardQuestion).toBe('test question')
    expect(endAppState.cardsFetchData.max).toBe(10)
    expect(endAppState.cardsFetchData.min).toBe(5)
    expect(endAppState.cardsFetchData.pageCount).toBe(40)
    expect(endAppState.cardsFetchData.sortCards).toBe('1grade')

})
