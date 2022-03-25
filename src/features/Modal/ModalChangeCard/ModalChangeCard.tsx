import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import stylesModuleAdd from '../ModalAddPack/ModalAddPack.module.css';
import stylesLogin from '../../../components/Login/Login.module.css';
import stylesAddCard from '../ModalAddCard/ModalAddCard.module.css';
import stylesModuleDelete from '../ModalDeletePack/ModalDeletePack.module.css';
import Preloader from '../../Preloader/Preloader';
import {ModalCRUDType} from '../../../components/PacksList/TablePacks/TablePacks';
import {CardType} from '../../../api/card-api';

type ModalChangeCardType = {
    isFetching: boolean
    closing: (modal: ModalCRUDType) => void
    changeCard: (card:CardType) => void
    question:string
    answer:string
    cardId:string
}

const ModalChangeCard = (props:ModalChangeCardType) => {

    const [question, setQuestion] = useState(props.question)
    const [answer, setAnswer] = useState(props.answer)
    const [error, setError] = useState('')

    function addPackHandler() {
        if(question.trim() === props.question && answer.trim() === props.answer){
            props.closing('changeCard')
            return
        }
        if (question.trim() && answer.trim()) {
            const card = {
                answer: answer,
                question: question,
                cardsPack_id: '',
                user_id: '',
                _id: props.cardId,
                grade:0,
                created: new Date()
            }
            props.changeCard(card)
            props.closing('changeCard')
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
            <div className={stylesModuleAdd.header}>Edit Card</div>
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
                                    onClick={() => props.closing('changeCard')}
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

export default ModalChangeCard;
