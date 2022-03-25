import React from 'react';
import stylesModuleDelete from '../ModalDeletePack/ModalDeletePack.module.css';
import Preloader from '../../Preloader/Preloader';
import stylesPack from '../../../components/PacksList/PacksList.module.css';
import {ModalCRUDType} from '../../../components/PacksList/TablePacks/TablePacks';

type ModalDeleteCardType = {
    cardName: string
    closing: (modal:ModalCRUDType) => void
    removeCard: (id: string) => void
    cardId: string
    isFetching: boolean
}

const ModalDeleteCard = (props:ModalDeleteCardType) => {
    function removePackHandler(packId: string) {
        props.removeCard(packId)
        props.closing('deleteCard')
    }
    const setCardName = ()=>{
        if(props.cardName.length > 30){
            return  props.cardName.split('').slice(1,30).join('') + '...'
        }
      return props.cardName
    }
    return (
        <div>
            <div className={stylesModuleDelete.header}>Delete Card</div>
            <p className={stylesModuleDelete.description}>Do you really want to remove<br/>
                <strong>Card Name - <span>{setCardName()}</span>?</strong><br/>
                </p>
            <div className={stylesModuleDelete.buttonsBlock}>
                {
                    props.isFetching
                        ?
                        <Preloader/>
                        :
                        <>
                            <button className={`${stylesPack.tableButton} ${stylesModuleDelete.button}`}
                                    onClick={()=>props.closing('deleteCard')}
                            >Cancel
                            </button>
                            <button className={`${stylesPack.tableButton} 
                ${stylesModuleDelete.button} ${stylesPack.deleteTableButton}`}
                                    onClick={() => removePackHandler(props.cardId)}
                            >Delete
                            </button>
                        </>
                }
            </div>
        </div>
    );
};

export default ModalDeleteCard;
