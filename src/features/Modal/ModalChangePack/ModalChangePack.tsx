import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import stylesModuleAdd from '../ModalAddPack/ModalAddPack.module.css';
import stylesLogin from '../../../components/Login/Login.module.css';
import stylesModuleDelete from '../ModalDeletePack/ModalDeletePack.module.css';
import Preloader from '../../Preloader/Preloader';
import {ModalCRUDType} from '../../../components/PacksList/TablePacks/TablePacks';

type ModalChangePackType = {
    closing: (modal: ModalCRUDType) => void
    changePackName: (id: string, name: string) => void
    isFetching: boolean
    packName: string
    packId: string
}

const ModalChangePack = (props:ModalChangePackType) => {
    const [title, setTitle] = useState(props.packName)
    const [error, setError] = useState('')

    function addPackHandler() {
        if(title.trim() === props.packName){
            props.closing('change')
            return
        }
        if (title.trim()) {
            props.changePackName(props.packId, title)
            props.closing('change')
        } else {
            setError('name is not valid')
        }
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setError('')
        setTitle(e.currentTarget.value)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addPackHandler()
        }
    }

    return (
        <div>
            <div className={stylesModuleAdd.header}>Change Pack Name</div>
            <div className={stylesLogin.inputsBlock}>
                <input type="text"
                       placeholder={'enter new pack name'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <div className={stylesModuleAdd.error}>{error}</div>
            </div>
            <div className={stylesModuleDelete.buttonsBlock}>
                {
                    props.isFetching
                        ?
                        <Preloader/>
                        :
                        <>
                            <button className={` ${stylesModuleAdd.addTableButton} ${stylesModuleAdd.buttonCancel}`}
                                    onClick={() => props.closing('change')}
                            >Cancel
                            </button>
                            <button className={` ${stylesModuleAdd.addTableButton} ${stylesModuleAdd.buttonSave}`}
                                    onClick={addPackHandler}
                                    disabled={!!error}
                            >Save
                            </button>
                        </>
                }
            </div>

        </div>
    );
};

export default ModalChangePack;
