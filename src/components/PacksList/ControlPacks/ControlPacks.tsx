import React, {ChangeEvent, useState} from 'react';
import stylesPack from '../PacksList.module.css';
import stylesLogin from '../../Login/Login.module.css';
import SuperInput, {ValueNumberOfCardsType} from '../../../features/SuperInput/SuperInput';
import {setPacksFetchData} from '../../../BLL/packsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../../BLL/store';
import {PacksFetchDataType} from '../../../api/pack-api';
import Modal from '../../../features/Modal/Modal';
import ModalAddPack from '../../../features/Modal/ModalAddPack/ModalAddPack';
import {ModalCRUDType} from '../TablePacks/TablePacks';

type ControlPacksType = {
    isFetching: boolean
    maxCardsCount: number
    value: ValueNumberOfCardsType
    setValue: (value: ValueNumberOfCardsType) => void
    addNewPack: (packTitle:string) => void
    closing: (modal: ModalCRUDType)=>void
    modalAddIsOpen:boolean
    opening: (modal: ModalCRUDType, packId?: string)=>void
    setModalAddIsOpen: (value:boolean) =>void
}

const ControlPacks = (props: ControlPacksType) => {
    const [id, setId] = useState(0)
    const packsFetchData = useSelector<RootStateType, PacksFetchDataType>(state => state.packs.packsFetchData)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const [valueName, setValueName] = useState(packsFetchData.packName)
    const dispatch = useDispatch()
    const changeFilter = (userId: string) => {
        if (userId === packsFetchData.user_id) {
            return
        }
        dispatch(setPacksFetchData({...packsFetchData, user_id: userId}))
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
            dispatch(setPacksFetchData(newPacksFetchData))
        }, 1500)
        setId(+ident)
    }
    const addNewPackHandler = (title:string) => {
        props.addNewPack(title)
    }
    const filterByPackName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setValueName(value)
        const newPacksFetchData = {...packsFetchData, packName: value}
        clearTimeout(id)
        setId(0)
        let ident = setTimeout(() => {
            dispatch(setPacksFetchData(newPacksFetchData))
        }, 1500)
        setId(+ident)
    }
    const resetUserId = ''

    return (
        <>
            <Modal closing={props.closing}
                   modalIsOpen={props.modalAddIsOpen}
                   height={250}
                   width={350}
                   modalAction={'add'}
                   setModalIsOpen={props.setModalAddIsOpen}
            >
                <ModalAddPack closing={props.closing}
                              addPack={addNewPackHandler}
                              isFetching={props.isFetching}
                />
            </Modal>
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
                            value={props.value}
                            setValue={props.setValue}
                            maxCardsCount={props.maxCardsCount}
                            isFetching={props.isFetching}
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
                        onClick={()=>props.opening('add')}
                        disabled={props.isFetching}
                        className={stylesLogin.button}
                    >Add new pack
                    </button>
                </div>
            </div>
        </>
    );
};

export default ControlPacks;
