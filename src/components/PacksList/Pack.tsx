import React from 'react';
import stylesPack from './PacksList.module.css';
import {PackType} from '../../api/pack-api';
import {ModalCRUDType} from './TablePacks/TablePacks';
import {getUserCards, setCardsPackId} from '../../BLL/cardsReducer';
import {useDispatch} from 'react-redux';

type PackPropsType = {
    pack: PackType
    userId: string
    opening: (modal: ModalCRUDType, packId?: string) => void
    runToCards: (id: string) => void
}
const Pack = ({pack, ...props}: PackPropsType) => {
    const dispatch = useDispatch()
    const isLearning = () => {
        dispatch(setCardsPackId(pack._id))
        dispatch(getUserCards())
        props.opening('learnPage')
    }

    return (
        <>
            <td className={stylesPack.colName}>{pack.name}</td>
            <td>{pack.cardsCount}</td>
            <td>{new Date(pack.created).toLocaleDateString()}</td>
            <td>{pack.user_name}</td>
            <td>
                {props.userId === pack.user_id
                    ?
                    <>
                        <button
                            className={`${stylesPack.tableButton} ${stylesPack.deleteTableButton}`}
                            onClick={() => props.opening('delete', pack._id)}
                        >delete
                        </button>
                        <button className={`${stylesPack.tableButton}`}
                                onClick={() => props.opening('change', pack._id)}
                        >edit
                        </button>
                        <button className={`${stylesPack.tableButton}`}
                                onClick={isLearning}
                        >learn
                        </button>
                        <button className={`${stylesPack.tableButton}`}
                                onClick={() => {
                                    props.runToCards(pack._id)
                                }}
                        >open
                        </button>
                    </>
                    :
                    <>
                        <button className={`${stylesPack.tableButton}`}
                                onClick={isLearning}
                        >learn
                        </button>
                        <button className={`${stylesPack.tableButton}`}
                                onClick={() => {
                                    props.runToCards(pack._id)
                                }}
                        >open
                        </button>
                    </>
                }
            </td>
        </>
    );

};

export default Pack;
