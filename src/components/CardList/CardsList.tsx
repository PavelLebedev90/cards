import React, {useEffect, useState} from 'react';
import stylesCardsList from './CardList.module.css'
import Preloader from "../../features/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import stylesLogin from "../Login/Login.module.css";
import {CardFetchDataType, CardType} from "../../api/card-api";
import {setUserPacks} from "../../BLL/packsReducer";
import {getUserCards} from "../../BLL/cardsReducer";
import {Navigate} from "react-router-dom";

const CardsList = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector<RootStateType, boolean>(state => state.login.isFetching)
    const userId = useSelector<RootStateType, string>( state => state.login.user._id)
    const cards = useSelector<RootStateType, CardType[]>( state => state.cards.cards.cards)
    const cardsFetchData = useSelector<RootStateType, CardFetchDataType>( state => state.cards.cardsFetchData)
    // useEffect(() => {
    //     if (userId) {
    //         dispatch(getUserCards(cardsFetchData))
    //     }
    // }, [])

    if (!userId) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    return (
        <div className={stylesCardsList.wrapper}>

            <h1 className={stylesCardsList.header}>
                Pack list
            </h1>
            <div className={stylesCardsList.formPacks}>

                <div className={stylesCardsList.buttonsBlock}>
                    <button
                        // onClick={onClickHandler}
                        //       disabled={!!error || !valid}
                        className={stylesLogin.button}
                    >Add new pack
                    </button>
                    {/*}*/}
                </div>
            </div>
            {
                isFetching
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
                    cards.map( (card) => {
                        return <tr key={card._id}>
                            <td className={stylesCardsList.colName}>{card.question}</td>
                            <td>{card.answer}</td>
                            <td>{new Date(card.created).toLocaleDateString()}</td>
                            <td>{card.grade}</td>
                            <td>
                                {userId === cardsFetchData.cardsPack_id
                                    ?
                                    <>
                                        <button className={`${stylesCardsList.tableButton}`}>update</button>
                                        <button
                                            className={`${stylesCardsList.tableButton} ${stylesCardsList.deleteTableButton}`}>delete
                                        </button>
                                    </>
                                    : <div/>
                                }
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
