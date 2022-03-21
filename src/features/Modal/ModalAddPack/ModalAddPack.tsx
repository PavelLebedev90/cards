import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import stylesModuleDelete from '../ModalDeletePack/ModalDeletePack.module.css';
import Preloader from '../../Preloader/Preloader';
import stylesModuleAdd from './ModalAddPack.module.css'
import {ModalCRUDType} from '../../../components/PacksList/TablePacks/TablePacks';
import stylesLogin from '../../../components/Login/Login.module.css';

type ModalAddPackType = {
    closing: (modal: ModalCRUDType) => void
    addPack: (title: string) => void
    isFetching: boolean
}

const ModalAddPack = (props: ModalAddPackType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    function addPackHandler() {
        if (title.trim()) {
            props.addPack(title)
            props.closing('add')
        } else {
            setError('title is not valid')
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
            <div className={stylesModuleAdd.header}>Add New Pack</div>
            <div className={stylesLogin.inputsBlock}>
                <input type="text"
                       placeholder={'enter pack name'}
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
                                    onClick={() => props.closing('add')}
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

export default ModalAddPack;
