import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import stylesModuleAdd from '../ModalAddPack/ModalAddPack.module.css';
import stylesLogin from '../../../components/Login/Login.module.css';
import stylesModuleDelete from '../ModalDeletePack/ModalDeletePack.module.css';
import Preloader from '../../Preloader/Preloader';
import {ModalCRUDType} from '../../../components/PacksList/TablePacks/TablePacks';
import stylesAddCard from './ModalAddCard.module.css'

type ModalAddCardType = {
    isFetching: boolean
    closing: (modal: ModalCRUDType) => void
    addCard: (question: string, answer: string) => void
}

const ModalAddCard = (props: ModalAddCardType) => {

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState('')

    function addPackHandler() {
        if (question.trim() && answer.trim()) {
            props.addCard(question, answer)
            props.closing('addNewCard')
        } else {
            setError('title is not valid')
        }
    }

    function onChangeHandler(e: ChangeEvent<HTMLTextAreaElement>) {
        if (e.currentTarget.name === 'question') {
            setQuestion(e.currentTarget.value)
        }
        if (e.currentTarget.name === 'answer') {
            setAnswer(e.currentTarget.value)
        }
        setError('')
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter') {
            addPackHandler()
        }
    }

    return (
        <div>
            <div className={stylesModuleAdd.header}>Add New Card</div>
            <div className={stylesLogin.inputsBlock}>
                    <textarea
                        className={stylesAddCard.textarea}
                        name="question"
                        placeholder={'enter question'}
                        value={question}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                    />
                <textarea
                    className={stylesAddCard.textarea}
                    name="answer"
                    placeholder={'enter answer'}
                    value={answer}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <div className={stylesAddCard.error}>{error}</div>
            </div>
            <div className={stylesModuleDelete.buttonsBlock}>
                {
                    props.isFetching
                        ?
                        <Preloader/>
                        :
                        <>
                            <button className={` ${stylesModuleAdd.addTableButton} ${stylesModuleAdd.buttonCancel}`}
                                    onClick={() => props.closing('addNewCard')}
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

export default ModalAddCard;
