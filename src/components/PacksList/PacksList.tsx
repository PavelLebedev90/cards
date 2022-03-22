import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../BLL/store';
import {Navigate, useSearchParams} from 'react-router-dom';
import stylesPack from './PacksList.module.css'
import stylesLogin from '../Login/Login.module.css';
import {ValueNumberOfCardsType} from '../../features/SuperInput/SuperInput';
import { changeUserPack, setPacksFetchData, setUserPacks} from '../../BLL/packsReducer';
import {PacksDataType, PacksFetchDataType} from '../../api/pack-api';
import {Paginate} from '../../features/Paginate/Paginate';
import ControlPacks from './ControlPacks/ControlPacks';
import TablePacks, {ModalCRUDType} from './TablePacks/TablePacks';
import {setOpenModal} from '../../BLL/appReducer';
import {setCardsPackId} from '../../BLL/cardsReducer';


const PacksList = () => {
    const maxCardsCount = useSelector<RootStateType, number>(state => state.packs.packs.maxCardsCount)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const dispatch = useDispatch()
    const isFetching = useSelector<RootStateType, boolean>(state => state.packs.isFetching)
    const packs = useSelector<RootStateType, PacksDataType>(state => state.packs.packs)
    const packsFetchData = useSelector<RootStateType, PacksFetchDataType>(state => state.packs.packsFetchData)
    const [navToCardsList, setNavToCardsList] = useState<boolean>(false)
    const [value, setValue] = useState<ValueNumberOfCardsType>({min: 0, max: maxCardsCount});
    const [initialPage, setInitialPage] = useState(packs.page)
    const [currentPageCount, setCurrentPageCount] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
    const [modalAddIsOpen, setModalAddIsOpen] = useState(false)
    const [packId, setPackId] = useState('')
    const pageQuery = searchParams.get('page')
    //костыль для оптимизации запроса
    const [kostil, setKostil] = useState(false)
    useEffect(() => {
        setValue({...value, max: maxCardsCount})
        setInitialPage(packs.page)
        setSearchParams({page: packs.page.toString()})
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
    function closing(modal: ModalCRUDType) {
        if (modal === 'delete') {
            setModalDeleteIsOpen(false)
        }
        if (modal === 'add') {
            setModalAddIsOpen(false)
        }
        dispatch(setOpenModal(false))
    }

    function opening(modal: ModalCRUDType, packId?: string) {
        if (modal === 'delete' && packId) {
            setPackId(packId)
            setModalDeleteIsOpen(true)
        }
        if (modal === 'add') {
            setModalAddIsOpen(true)
        }
        dispatch(setOpenModal(true))
    }

    useEffect(() => {
        dispatch(setUserPacks())
    }, [packsFetchData])

    const runToCardsHandler =  (id: string) => {
        dispatch(setCardsPackId(id))
        setNavToCardsList(true)
    }
    if (!userId) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    const addNewPack = (packTitle:string) => {
        dispatch(changeUserPack('addPack', packTitle))
    }
    const changePackName = (id: string) => {
        dispatch(changeUserPack('changePack', id))
    }
    const removePack = (id: string) => {
        dispatch(changeUserPack('deletePack', id))
    }
    const onChange = ({selected}: { selected: number }) => {
        if (kostil) {
            dispatch(setPacksFetchData({...packsFetchData, page: selected + 1}))
        } else {
            setKostil(true)
        }
    }
    if (navToCardsList) {
        return (
            <Navigate to={'/cards-list'}/>
        )
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
                          closing={closing}
                          opening={opening}
                          modalAddIsOpen={modalAddIsOpen}
                          setModalAddIsOpen={setModalAddIsOpen}
            />

            <TablePacks setSortArrow={setSortArrow}
                        isFetching={isFetching}
                        sortPacks={packsFetchData.sortPacks}
                        userId={userId}
                        packs={packs}
                        changePackName={changePackName}
                        removePack={removePack}
                        closing={closing}
                        modalDeleteIsOpen={modalDeleteIsOpen}
                        packId={packId}
                        opening={opening}
                        setModalDeleteIsOpen={setModalDeleteIsOpen}
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










