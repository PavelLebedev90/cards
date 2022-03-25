import React from 'react';
import stylesPack from '../PacksList.module.css';
import downArrow from '../../../logo/arrows/downArrow.svg';
import upArrow from '../../../logo/arrows/upArrow.svg';
import {PacksDataType} from '../../../api/pack-api';
import Modal from '../../../features/Modal/Modal';
import ModalDeletePack from '../../../features/Modal/ModalDeletePack/ModalDeletePack';
import Pack from '../Pack';
import ModalChangePack from '../../../features/Modal/ModalChangePack/ModalChangePack';

type TablePacksType = {
    setSortArrow: () => void
    isFetching: boolean
    sortPacks: string
    userId: string
    packs: PacksDataType
    closing: (modal: ModalCRUDType) => void
    modalDeleteIsOpen: boolean
    packId: string
    opening: (modal: ModalCRUDType, packId?: string) => void
    setModalDeleteIsOpen: (value: boolean) => void
    modalChangeIsOpen: boolean
    setModalChangeIsOpen: (value: boolean) => void
    removePack: (id: string) => void
    changePackName: (id: string, newPackName: string) => void
    runToCards: (id: string) => void
}
export type ModalCRUDType = 'delete' | 'add' | 'change' | 'addNewCard' | 'deleteCard' | 'changeCard' | 'learnPage'

const TablePacks = (props: TablePacksType) => {
    const imageSortArrow = props.sortPacks === '1cardsCount' ? downArrow : upArrow
    const tableIsFetchingClass = props.isFetching ? stylesPack.tableFetching : ''

    return (
        <table className={`${stylesPack.table} ${tableIsFetchingClass}`}>
            <thead>
            <tr>
                <th>Name</th>
                <th className={stylesPack.logoWrapper}>
                    Cards
                    <img className={stylesPack.sortLogo}
                         src={imageSortArrow}
                         alt={'sort arrow'}
                         onClick={props.setSortArrow}
                    />
                </th>
                <th>Last Updated</th>
                <th>Created by</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {props.packs.cardPacks.length ?
                props.packs.cardPacks.map((pack) => {
                    return <tr key={pack._id}>
                        {(pack._id === props.packId
                        && props.modalDeleteIsOpen &&
                            <Modal closing={props.closing}
                                   modalIsOpen={props.modalDeleteIsOpen}
                                   height={250}
                                   width={350}
                                   modalAction={'delete'}
                                   setModalIsOpen={props.setModalDeleteIsOpen}
                            >
                                <ModalDeletePack packName={pack.name}
                                                 closing={props.closing}
                                                 removePack={props.removePack}
                                                 packId={props.packId}
                                                 isFetching={props.isFetching}
                                />
                            </Modal>)
                            ||
                           ( pack._id === props.packId
                               && props.modalChangeIsOpen &&
                               <Modal closing={props.closing}
                                   modalIsOpen={props.modalChangeIsOpen}
                                   height={250}
                                   width={350}
                                   modalAction={'change'}
                                   setModalIsOpen={props.setModalChangeIsOpen}
                            >
                                <ModalChangePack
                                    packId={pack._id}
                                    closing={props.closing}
                                    changePackName={props.changePackName}
                                    packName={pack.name}
                                    isFetching={props.isFetching}/>
                            </Modal>)
                        }
                        <Pack pack={pack}
                              userId={props.userId}
                              opening={props.opening}
                              runToCards={props.runToCards}
                        />
                    </tr>
                })
                :
                <tr>
                    <td colSpan={5}>Nothing found for your request</td>
                </tr>
            }
            </tbody>
        </table>
    );
};

export default TablePacks;
