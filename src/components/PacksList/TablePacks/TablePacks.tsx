import React from 'react';
import stylesPack from '../PacksList.module.css';
import downArrow from '../../../logo/arrows/downArrow.svg';
import upArrow from '../../../logo/arrows/upArrow.svg';
import {PacksDataType} from '../../../api/pack-api';

type TablePacksType = {
    setSortArrow: ()=>void
    isFetching:boolean
    sortPacks:string
    userId:string
    packsFetchUserId:string
    packs: PacksDataType
    removePack: (id:string)=>void
    changePackName: (id:string) =>void
    runToCards: (id: string) => void
}

const TablePacks = (props:TablePacksType) => {
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
                        <td className={stylesPack.colName}>{pack.name}</td>
                        <td>{pack.cardsCount}</td>
                        <td>{new Date(pack.created).toLocaleDateString()}</td>
                        <td>{pack.user_name}</td>
                        <td>
                            {props.userId === props.packsFetchUserId
                                ?
                                <>
                                    <button
                                        className={`${stylesPack.tableButton} ${stylesPack.deleteTableButton}`}
                                        onClick={()=>props.removePack(pack._id)}
                                    >delete
                                    </button>
                                    <button className={`${stylesPack.tableButton}`}
                                            onClick={()=>props.changePackName(pack._id)}
                                    >edit
                                    </button>
                                    <button className={`${stylesPack.tableButton}`}>learn</button>
                                    <button className={`${stylesPack.tableButton}`}
                                            onClick={ () => {props.runToCards(pack._id)}}>open</button>
                                </>
                                :
                                <>
                                    <button className={`${stylesPack.tableButton}`}>learn</button>
                                    <button className={`${stylesPack.tableButton}`}
                                            onClick={ () => {props.runToCards(pack._id)}}>open</button>
                                </>

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
    );
};

export default TablePacks;