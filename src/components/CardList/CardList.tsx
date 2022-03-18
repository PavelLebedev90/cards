import React from 'react';
import stylesCardsList from './CardList.module.css'
import Preloader from "../../features/Preloader/Preloader";
import {useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import stylesLogin from "../Login/Login.module.css";
import stylesPack from "../PacksList/PacksList.module.css";

const CardList = () => {
    const isFetching = useSelector<RootStateType, boolean>(state => state.login.isFetching)
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
            {/*{*/}
            {/*    isFetching*/}
            {/*        ?*/}
            {/*        <div className={stylesPackList.preloaderControl}><Preloader/></div>*/}
            {/*        : ''*/}
            {/*}*/}
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
                <tr>
                    <td className={stylesCardsList.colName}>name</td>
                    <td>count</td>
                    <td>date creating</td>
                    <td>user name</td>
                    <td>
                        <button className={`${stylesCardsList.tableButton}`}>update</button>
                        <button
                            className={`${stylesCardsList.tableButton} ${stylesCardsList.deleteTableButton}`}>delete
                        </button>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CardList;
