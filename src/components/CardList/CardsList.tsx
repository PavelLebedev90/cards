import React, {useEffect, useState} from 'react';
import stylesCardsList from './CardList.module.css'
import Preloader from '../../features/Preloader/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../BLL/store';
import stylesLogin from '../Login/Login.module.css';
import {CardFetchDataType, CardType} from '../../api/card-api';
import {Navigate} from 'react-router-dom';
import {addCard, changeCard, deleteCard, getUserCards} from '../../BLL/cardsReducer';
import ActionBlock from './ActionBlock/ActionBlock';
import Modal from '../../features/Modal/Modal';
import ModalAddCard from '../../features/Modal/ModalAddCard/ModalAddCard';
import {setOpenModal} from '../../BLL/appReducer';
import {ModalCRUDType} from '../PacksList/TablePacks/TablePacks';
import ModalDeleteCard from '../../features/Modal/ModalDeleteCard/ModalDeleteCard';
import ModalChangeCard from '../../features/Modal/ModalChangeCard/ModalChangeCard';

const CardsList = () => {
    const [modalAddIsOpen, setModalAddIsOpen] = useState(false)
    const [modalDeleteCardIsOpen, setModalDeleteCardIsOpen] = useState(false)
    const [modalUpdateCardIsOpen, setModalUpdateCardIsOpen] = useState(false)
    const [cardId, setCardId] = useState('')
    const dispatch = useDispatch()
    const isFetching = useSelector<RootStateType, boolean>(state => state.packs.isFetching)
    const isLoading = useSelector<RootStateType, boolean>(state => state.cards.isLoading)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const cards = useSelector<RootStateType, CardType[]>(state => state.cards.cards.cards)
    //const errorMessage = useSelector<RootStateType, string>(state => state.cards.error)
    const isAnotherUser = useSelector<RootStateType, boolean>(state => state.cards.anotherUser)
    const cardsFetchData = useSelector<RootStateType, CardFetchDataType>(state => state.cards.cardsFetchData)
    const onClickHandler = (question: string, answer: string) => {
        dispatch(addCard(question, answer))
    }
    const deleteCardHandler = (id: string) => {
        dispatch(deleteCard(id))
    }
    const closing = (modal: ModalCRUDType) => {
        if (modal === 'addNewCard') {
            setModalAddIsOpen(false)
        }
        if (modal === 'deleteCard') {
            setCardId('')
            setModalDeleteCardIsOpen(false)
        }
        if (modal === 'changeCard') {
            setCardId('')
            setModalUpdateCardIsOpen(false)
        }
        dispatch(setOpenModal(false))
    }
    const opening = (modal: ModalCRUDType, idCard?:string) => {
        if (modal === 'addNewCard') {
            setModalAddIsOpen(true)
        }
        if(modal === 'deleteCard' && idCard !== undefined){
            setCardId(idCard)
            setModalDeleteCardIsOpen(true)
        }
        if (modal === 'changeCard' && idCard !== undefined) {
            setCardId(idCard)
            setModalUpdateCardIsOpen(true)
        }
        dispatch(setOpenModal(true))
    }
    const callbackDeleteButton = (idCard: string) => {
        deleteCardHandler(idCard)
    }
    const callbackChangeCard = (card: CardType) =>{
        dispatch(changeCard(card))
    }
    useEffect(() => {
        dispatch(getUserCards())
    }, [cardsFetchData, dispatch])

    if (!userId) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    return (
        <div className={stylesCardsList.wrapper}>
            <Modal closing={closing}
                   modalIsOpen={modalAddIsOpen}
                   height={300}
                   width={350}
                   modalAction={'addNewCard'}
                   setModalIsOpen={setModalAddIsOpen}
            >
                <ModalAddCard closing={closing}
                              addCard={onClickHandler}
                              isFetching={isFetching}
                />
            </Modal>
            <h1 className={stylesCardsList.header}>
                Cards list
            </h1>
            <div className={stylesCardsList.formPacks}>

                <div className={stylesCardsList.buttonsBlock}>
                    <button
                        onClick={() => opening('addNewCard')}
                        disabled={isLoading || isAnotherUser}
                        className={stylesLogin.button}
                    >Add new card
                    </button>
                    {/*}*/}
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
                    <th>Question</th>
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
                            {(card._id === cardId
                            && modalDeleteCardIsOpen &&
                            <Modal closing={closing}
                                   modalIsOpen={modalDeleteCardIsOpen}
                                   height={250}
                                   width={350}
                                   modalAction={'deleteCard'}
                                   setModalIsOpen={setModalDeleteCardIsOpen}
                            >
                                <ModalDeleteCard closing={closing}
                                                 cardId={card._id}
                                                 cardName={card.question}
                                                 removeCard={callbackDeleteButton}
                                                 isFetching={isFetching}
                                />
                            </Modal>)
                                ||
                            (card._id === cardId
                                && modalUpdateCardIsOpen &&
                                <Modal closing={closing}
                                       modalIsOpen={modalUpdateCardIsOpen}
                                       height={300}
                                       width={350}
                                       modalAction={'changeCard'}
                                       setModalIsOpen={setModalUpdateCardIsOpen}
                                >
                                    <ModalChangeCard closing={closing}
                                                     cardId={card._id}
                                                     answer={card.answer}
                                                     question={card.question}
                                                     changeCard={callbackChangeCard}
                                                     isFetching={isFetching}
                                    />
                                </Modal>
                            )
                            }

                            <td className={stylesCardsList.colName}>{card.question}</td>
                            <td>{card.answer}</td>
                            <td>{new Date(card.created).toLocaleDateString()}</td>
                            <td>{card.grade}</td>
                            <td>
                                <ActionBlock
                                    isAnotherUser={isAnotherUser}
                                    isLoading={isLoading}
                                    idCard={card._id}
                                    opening={opening}
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
