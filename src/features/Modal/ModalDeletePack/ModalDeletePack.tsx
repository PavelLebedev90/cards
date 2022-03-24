import React from 'react';
import stylesModuleDelete from './ModalDeletePack.module.css'
import stylesPack from '../../../components/PacksList/PacksList.module.css';
import Preloader from '../../Preloader/Preloader';
import {ModalCRUDType} from '../../../components/PacksList/TablePacks/TablePacks';

type ModalDeletePackType = {
    packName: string
    closing: (modal:ModalCRUDType) => void
    removePack: (id: string) => void
    packId: string
    isFetching: boolean
}
const ModalDeletePack = (props: ModalDeletePackType) => {
   function removePackHandler(packId: string) {
       props.removePack(packId)
       props.closing('delete')
    }
    return (
        <div>
            <div className={stylesModuleDelete.header}>Delete Pack</div>
            <p className={stylesModuleDelete.description}>Do you really want to remove<br/>
                <strong>Pack Name - <span>{props.packName}</span>?</strong><br/>
                All cards will be excluded from this course.</p>
            <div className={stylesModuleDelete.buttonsBlock}>
                {
                    props.isFetching
                        ?
                        <Preloader/>
                        :
                        <>
                            <button className={`${stylesPack.tableButton} ${stylesModuleDelete.button}`}
                                    onClick={()=>props.closing('delete')}
                            >Cancel
                            </button>
                            <button className={`${stylesPack.tableButton} 
                ${stylesModuleDelete.button} ${stylesPack.deleteTableButton}`}
                                    onClick={() => removePackHandler(props.packId)}
                            >Delete
                            </button>
                        </>
                }

            </div>
        </div>
    );
};

export default ModalDeletePack;
