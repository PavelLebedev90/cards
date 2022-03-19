import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../BLL/store';
import {Navigate, useSearchParams} from 'react-router-dom';
import stylesPack from './PacksList.module.css'
import stylesLogin from '../Login/Login.module.css';
import {ValueNumberOfCardsType} from '../../features/SuperInput/SuperInput';
import {addUserPack, changeUserPack, deleteUserPack, setPacksFetchData, setUserPacks} from '../../BLL/packsReducer';
import {PacksDataType, PacksFetchDataType} from '../../api/pack-api';
import {Paginate} from '../../features/Paginate/Paginate';
import ControlPacks from './ControlPacks/ControlPacks';
import TablePacks from './TablePacks/TablePacks';
import {CardFetchDataType} from "../../api/card-api";
import {getUserCards, setCardsPackId} from "../../BLL/cardsReducer";


const PacksList = () => {
    const maxCardsCount = useSelector<RootStateType, number>(state => state.packs.packs.maxCardsCount)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const dispatch = useDispatch()
    const isFetching = useSelector<RootStateType, boolean>(state => state.packs.isFetching)
    const packs = useSelector<RootStateType, PacksDataType>(state => state.packs.packs)
    const packsFetchData = useSelector<RootStateType, PacksFetchDataType>(state => state.packs.packsFetchData)
    const [value, setValue] = useState<ValueNumberOfCardsType>({min: 0, max: maxCardsCount});
    const [initialPage, setInitialPage] = useState(packs.page)
    const [currentPageCount, setCurrentPageCount] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const fetchCardsData = useSelector<RootStateType, CardFetchDataType>(state => state.cards.cardsFetchData)
    const [navToCardsList, setNavToCardsList] = useState<boolean>(false)
    const pageQuery = searchParams.get('page')
    //костыль для оптимизации запроса
    const [kostil, setKostil] = useState(false)
    useEffect(() => {
        setValue({...value, max: maxCardsCount})
        setInitialPage(packs.page)
        setSearchParams({page:packs.page.toString()})
        setCurrentPageCount(Math.ceil(packs.cardPacksTotalCount ? packs.cardPacksTotalCount / packs.pageCount : 1))
    }, [maxCardsCount, packs.page])

    const setSortArrow = () => {
        const up = '0cardsCount'
        const down = '1cardsCount'
        if (packsFetchData.sortPacks === down) {
            dispatch(setPacksFetchData({...packsFetchData, sortPacks: up}))
        } else {
            dispatch(setPacksFetchData({...packsFetchData, sortPacks: down}))
        }
    }


    useEffect(() => {
        dispatch(setUserPacks())
    }, [packsFetchData])


    console.log('Packs Render')
    if (!userId) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    if (navToCardsList) {
        return (
            <Navigate to={'/cards-list'}/>
        )
    }
    const addNewPack = () => {
        dispatch(addUserPack())
    }
    const changePackName = (id: string) => {
        dispatch(changeUserPack(id))
    }
    const removePack = (id: string) => {
        dispatch(deleteUserPack(id))
    }
    const runToCardsHandler =  (id: string) => {
        dispatch(setCardsPackId(id))
        setNavToCardsList(true)
    }
    const onChange = ({selected}: { selected: number }) => {
        console.log('onChange')
        if (kostil) {
            dispatch(setPacksFetchData({...packsFetchData, page: selected + 1}))
        } else {
            setKostil(true)
        }
    }

    return (
        <div className={stylesPack.wrapper}>

            <h1 className={stylesLogin.header}>
                Packs list
            </h1>
            <ControlPacks value={value}
                          setValue={setValue}
                          isFetching={isFetching}
                          maxCardsCount={maxCardsCount}
                          addNewPack={addNewPack}
            />

            <TablePacks setSortArrow={setSortArrow}
                        isFetching={isFetching}
                        sortPacks={packsFetchData.sortPacks}
                        userId={userId}
                        packsFetchUserId={packsFetchData.user_id}
                        packs={packs}
                        changePackName={changePackName}
                        removePack={removePack}
                        runToCards={runToCardsHandler}
            />

            <Paginate pageCount={currentPageCount}
                      onChange={onChange}
                      isFetching={isFetching}
                      initialPage={initialPage}
            />
        </div>
    );
};

export default PacksList;
