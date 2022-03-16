import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../BLL/store';
import {Navigate} from 'react-router-dom';
import stylesPack from './PacksList.module.css'
import stylesLogin from '../Login/Login.module.css';
import SuperInput, {ValueNumberOfCardsType} from '../../features/SuperInput/SuperInput';
import {setUserPacks} from '../../BLL/packsReducer';
import {PacksFetchDataType, PackType} from '../../api/pack-api';
import Preloader from '../../features/Preloader/Preloader';
import upArrow from './../../logo/sortArrow/upArrow.svg'
import downArrow from './../../logo/sortArrow/downArrow.svg'

const PacksList = () => {
    const maxCardsCount = useSelector<RootStateType, number>(state => state.packs.packs.maxCardsCount)
    const minCardsCount = useSelector<RootStateType, number>(state => state.packs.packs.minCardsCount)
    const [value, setValue] = useState<ValueNumberOfCardsType>({min: minCardsCount, max: maxCardsCount});
    const [id, setId] = useState(0)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const dispatch = useDispatch()
    const isFetching = useSelector<RootStateType, boolean>(state => state.login.isFetching)
    const packs = useSelector<RootStateType, PackType[]>(state => state.packs.packs.cardPacks)
    const packsFetchData = useSelector<RootStateType, PacksFetchDataType>(state => state.packs.packsFetchData)
    const [valueName, setValueName] = useState(packsFetchData.packName)
    const changeFilter = (userId: string) => {
        if (userId === packsFetchData.user_id) {
            return
        }
        dispatch(setUserPacks({...packsFetchData, user_id: userId}))
    }
    const activeClassName = (filtered: string) => {
        if (packsFetchData.user_id === filtered) {
            return stylesPack.activeFilteredPacks
        }
        return stylesPack.filteredPacks
    }
    const filterByNumberOfCards = (value: ValueNumberOfCardsType) => {
        const newPacksFetchData = {...packsFetchData, ...value}
        clearTimeout(id)
        setId(0)
        let ident = setTimeout(() => {
            dispatch(setUserPacks(newPacksFetchData))
        }, 1500)
        setId(+ident)
    }
    const filterByPackName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setValueName(value)
        const newPacksFetchData = {...packsFetchData, packName: value}
        clearTimeout(id)
        setId(0)
        let ident = setTimeout(() => {
            dispatch(setUserPacks(newPacksFetchData))
        }, 1500)
        setId(+ident)
    }
    const setSortArrow = () => {
        const up = '0cardsCount'
        const down = '1cardsCount'
      if(packsFetchData.sortPacks === down){
          dispatch(setUserPacks({...packsFetchData, sortPacks: up}))
      }else{
          dispatch(setUserPacks({...packsFetchData, sortPacks: down}))
      }
    }
    useEffect(() => {
        if (userId) {
            dispatch(setUserPacks(packsFetchData))
        }
    }, [])
    useEffect(() => {
        setValue({...value, max: maxCardsCount, min: minCardsCount})
    }, [maxCardsCount, minCardsCount])

    if (!userId) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    const imageSortArrow = packsFetchData.sortPacks === '1cardsCount' ? downArrow : upArrow
    const tableIsFetchingClass = isFetching ? stylesPack.tableFetching : ''
    const resetUserId = ''
    return (
        <div className={stylesPack.wrapper}>

            <h1 className={stylesLogin.header}>
                Packs list
            </h1>
            <div className={`${stylesPack.formPacks} ${stylesPack.BGFormPacks}`}>
                <div className={`${stylesLogin.buttonsBlock} ${stylesPack.filterPacks}`}>
                    Show packs cards: <br/>
                    <div
                        className={activeClassName(userId)}
                        onClick={() => changeFilter(userId)}
                    >My
                    </div>
                    <div
                        className={activeClassName(resetUserId)}
                        onClick={() => changeFilter(resetUserId)}
                    >All
                    </div>
                </div>
                <div
                    className={stylesPack.rangeInputWrapper}
                >
                    Sort packs cards: <br/>
                    <div className={stylesPack.rangeInput}>
                        <SuperInput
                            value={value}
                            setValue={setValue}
                            isFetching={isFetching}
                            maxCardsCount={maxCardsCount}
                            filterByNumberOfCards={filterByNumberOfCards}
                        />
                    </div>
                </div>
            </div>
            <div className={stylesPack.formPacks}>
                <div className={stylesLogin.inputsBlock}>
                    <input type="text"
                           placeholder="Search..."
                           value={valueName}
                           onChange={filterByPackName}
                    />
                </div>

                <div className={stylesLogin.buttonsBlock}>
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
                    <div className={stylesPack.preloaderControl}><Preloader/></div>
                    : ''
            }
            <table className={`${stylesPack.table} ${tableIsFetchingClass}`}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th className={stylesPack.logoWrapper}>
                        Cards
                        <img className={stylesPack.sortLogo}
                             src={imageSortArrow}
                             alt={'sort arrow'}
                             onClick={setSortArrow}
                        />
                    </th>
                    <th>Last Updated</th>
                    <th>Created by</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {packs.length ?
                    packs.map((pack) => {
                        return <tr key={pack._id}>
                            <td className={stylesPack.colName}>{pack.name}</td>
                            <td>{pack.cardsCount}</td>
                            <td>{new Date(pack.created).toLocaleDateString()}</td>
                            <td>{pack.user_name}</td>
                            <td>
                                {userId === packsFetchData.user_id
                                    ?
                                    <>
                                        <button
                                            className={`${stylesPack.tableButton} ${stylesPack.deleteTableButton}`}>delete
                                        </button>
                                        <button className={`${stylesPack.tableButton}`}>edit</button>
                                        <button className={`${stylesPack.tableButton}`}>learn</button>
                                    </>
                                    :
                                    <button className={`${stylesPack.tableButton}`}>learn</button>
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

export default PacksList;
