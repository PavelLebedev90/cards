import React from 'react';
import stylesCardsList from "../CardList.module.css";
import {ModalCRUDType} from '../../PacksList/TablePacks/TablePacks';

type ActionBlockType = {
    isAnotherUser: boolean
    idCard: string
    isLoading: boolean
    opening: (modal: ModalCRUDType, idCard?:string) => void
}

const ActionBlock: React.FC<ActionBlockType> = ({
                                                    isLoading,
                                                    opening,
                                                    idCard,
                                                    isAnotherUser
                                                }) => {

    return (
        <div>
            <button className={`${stylesCardsList.tableButton}`}
                    disabled={isLoading || isAnotherUser}
                    onClick={()=>opening('changeCard', idCard)}
            >edit
            </button>
            <button
                onClick={()=>opening('deleteCard', idCard)}
                className={`${stylesCardsList.tableButton} ${stylesCardsList.deleteTableButton}`}
                disabled={isLoading || isAnotherUser}>delete
            </button>
        </div>
    );
};

export default ActionBlock;
