import React, {ChangeEvent, useEffect, useState} from 'react';
import stylesCardsList from './CardList.module.css'
import Preloader from "../../features/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import stylesLogin from "../Login/Login.module.css";
import {CardFetchDataType, CardType} from "../../api/card-api";
import {Navigate, useParams} from "react-router-dom";
import {addNewCard, deleteCard, getUserCards, setCardsFetchData, setCardsPackId, updateCard} from "../../BLL/cardsReducer";
import ActionBlock from "./ActionBlock/ActionBlock";
import downArrow from "../../logo/arrows/downArrow.svg";
import upArrow from "../../logo/arrows/upArrow.svg";


const CardsList = () => {
    const {idCardPack} = useParams()
    const dispatch = useDispatch()
    const isLoading = useSelector<RootStateType, boolean>(state => state.cards.isLoading)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const cards = useSelector<RootStateType, CardType[]>(state => state.cards.cards.cards)
    const cardsFetchData = useSelector<RootStateType, CardFetchDataType>(state => state.cards.cardsFetchData)
    const isAnotherUser = useSelector<RootStateType, boolean>(state => state.cards.anotherUser)
    const [isUpdateInput, setIsUpdateInput] = useState<boolean>(false)
    const [currentIdUpdateCard, setCurrentIdUpdateCard] = useState<string>('')
    const [answerData, setAnswerData] = useState<string>('')
    const [questionData, setQuestionData] = useState<string>('')
    const setUpdateCardHandler = (id: string) => {
        dispatch(updateCard(id, questionData, answerData))
        setIsUpdateInput(false)
        setAnswerData('')
        setQuestionData('')
    }
    const toggleInputHandler = (id: string) => {
        setCurrentIdUpdateCard(id)
        const initialAnswer = cards.filter(i => i._id === id)[0].answer
        const initialQuestion = cards.filter(i => i._id === id)[0].question
        setAnswerData(initialAnswer === 'no answer' ? '' : initialAnswer)
        setQuestionData(initialQuestion === 'no question' ? '' : initialAnswer)
        setIsUpdateInput(true)
    }
    const addNewCardHandler = () => {
        dispatch(addNewCard())
    }
    const deleteCardHandler = (id: string) => {
        dispatch(deleteCard(id))
    }
    const updateAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerData(e.currentTarget.value)
    }
    const updateQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionData(e.currentTarget.value)
    }
    const imageSortArrow = cardsFetchData.sortCards === '1grade' ? downArrow : upArrow
    const setSortArrow = () => {
        const up = '0grade'
        const down = '1grade'
        if (cardsFetchData.sortCards === down) {
            dispatch(setCardsFetchData({...cardsFetchData, sortCards: up}))
        } else {
            dispatch(setCardsFetchData({...cardsFetchData, sortCards: down}))
        }
        dispatch(getUserCards())
    }
    useEffect(() => {
        dispatch(setCardsPackId(idCardPack))
        dispatch(getUserCards())
    }, [dispatch, idCardPack])

    if (!userId) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    return (
        <div className={stylesCardsList.wrapper}>

            <h1 className={stylesCardsList.header}>
                Cards list
            </h1>
            <div className={stylesCardsList.formPacks}>

                <div className={stylesCardsList.buttonsBlock}>
                    <button
                        onClick={addNewCardHandler}
                        disabled={isLoading || isAnotherUser}
                        className={stylesLogin.button}
                    >Add new card
                    </button>
                </div>
            </div>
            {
                isLoading
                    ?
                    <div className={stylesCardsList.preloaderControl}><Preloader/></div>
                    : ''
            }
            <table className={stylesCardsList.table}>
                <thead>
                <tr>
                    <th>
                        <div className={stylesCardsList.lastUpdatedBlock}>
                            Question
                            <img className={stylesCardsList.sortLogo}
                                 src={imageSortArrow}
                                 alt={'sort arrow'}
                                 onClick={setSortArrow}
                            />
                        </div>
                    </th>
                    <th>Answer</th>
                    <th>Last updated</th>
                    <th>Grade</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cards.length ?
                    cards.map((card) => {
                        return <tr key={card._id}>
                            {isUpdateInput && currentIdUpdateCard === card._id ?
                                <>
                                    <td><input type='text'
                                               value={questionData}
                                               onChange={updateQuestionHandler}/>
                                    </td>
                                    <td><input type='text'
                                               value={answerData}
                                               onChange={updateAnswerHandler}/>
                                    </td>
                                </> :
                                <>
                                    <td className={stylesCardsList.colName}>{card.question}</td>
                                    <td>{card.answer}</td>
                                </>
                            }
                            <td>{new Date(card.created).toLocaleDateString()}</td>
                            <td>{card.grade}</td>
                            <td>
                                <ActionBlock
                                    isAnotherUser={isAnotherUser}
                                    isLoading={isLoading}
                                    idCard={card._id}
                                    deleteCardHandler={deleteCardHandler}
                                    toggleInputHandler={toggleInputHandler}
                                    currentIdUpdateCard={currentIdUpdateCard}
                                    isUpdateInput={isUpdateInput}
                                    setUpdateCardHandler={setUpdateCardHandler}

                                />
                            </td>
                        </tr>
                    })
                    :
                    <tr>
                        <td colSpan={5}>Nothing found for your request</td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
};

export default CardsList;
