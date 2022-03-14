import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../BLL/store';
import {Navigate} from 'react-router-dom';
import stylesPack from './PacksList.module.css'
import stylesLogin from '../Login/Login.module.css';
import SuperInput from '../../features/SuperInput/SuperInput';
import {setUserPacks} from '../../BLL/packsReducer';
import {PackType} from '../../api/pack-api';

type FilteredPacksType = 'all' | 'my'
const PacksList = () => {
    const [filter, setFilter] = useState<FilteredPacksType>('all')
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const dispatch = useDispatch()
    const packs = useSelector<RootStateType, PackType[]>(state => state.packs.packs.cardPacks)
    const changeFilter = (filtered: FilteredPacksType) => {
        if (filter === filtered) {
            return
        }
        setFilter(filtered)
    }
    const activeClassName = (filtered: FilteredPacksType) => {
        if (filter === filtered) {
            return stylesPack.activeFilteredPacks
        }
        return stylesPack.filteredPacks
    }
    useEffect(() => {
        dispatch(setUserPacks())
    }, [dispatch])
    if (!userId) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    return (
        <div className={stylesPack.wrapper}>

            <h1 className={stylesLogin.header}>
                Packs list
            </h1>
            <div className={`${stylesPack.formPacks} ${stylesPack.BGFormPacks}`}>
                <div className={`${stylesLogin.buttonsBlock} ${stylesPack.filterPacks}`}>
                    Show packs cards: <br/>
                    <div className={activeClassName('my')}
                         onClick={() => changeFilter('my')}
                    >My
                    </div>
                    <div className={activeClassName('all')}
                         onClick={() => changeFilter('all')}
                    >All
                    </div>
                </div>
                <div
                    className={stylesPack.rangeInputWrapper}
                >
                    Sort packs cards: <br/>
                    <div className={stylesPack.rangeInput}>
                        <SuperInput/>
                    </div>
                </div>
            </div>
            <div className={stylesPack.formPacks}>
                <div className={stylesLogin.inputsBlock}>
                    <input type="text"
                           placeholder="Search..."
                        // value={emailState}
                        // onChange={emailHandler}
                    />
                </div>

                <div className={stylesLogin.buttonsBlock}>
                    {/*<div className={stylesLogin.error}>{error}</div>*/}
                    {/*{isFetching*/}
                    {/*    ? <Preloader/>*/}
                    {/*    : */}
                    <button
                        // onClick={onClickHandler}
                        //       disabled={!!error || !valid}
                        className={stylesLogin.button}
                    >Add new pack
                    </button>
                    {/*}*/}
                </div>
            </div>
            <table className={stylesPack.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Cards</th>
                    <th>Last Updated</th>
                    <th>Created by</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {packs.map((pack) => {
                    return <tr>
                        <td className={stylesPack.colName}>{pack.name}</td>
                        <td>{pack.cardsCount}</td>
                        <td>{pack.created}</td>
                        <td>{pack.user_name}</td>
                        <td>
                            <button className={`${stylesPack.tableButton} ${stylesPack.deleteTableButton}`}>delete
                            </button>
                            <button className={`${stylesPack.tableButton}`}>edit</button>
                            <button className={`${stylesPack.tableButton}`}>learn</button>
                        </td>
                    </tr>
                })}

                </tbody>
            </table>
        </div>
    );
};

export default PacksList;
