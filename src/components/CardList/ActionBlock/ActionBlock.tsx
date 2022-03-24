import React from 'react';
import stylesCardsList from "../CardList.module.css";

type ActionBlockType = {
    isAnotherUser: boolean
    idCard: string
    isLoading: boolean
    isUpdateInput: boolean
    currentIdUpdateCard: string
    deleteCardHandler: (id: string) => void
    toggleInputHandler: (id: string) => void
    setUpdateCardHandler: (id: string) => void
}

const ActionBlock: React.FC<ActionBlockType> = ({
                                                    isLoading,
                                                    deleteCardHandler,
                                                    idCard,
                                                    isAnotherUser,
                                                    toggleInputHandler,
                                                    currentIdUpdateCard,
                                                    isUpdateInput,
                                                    setUpdateCardHandler
                                                }) => {
    const callbackDeleteButton = () => {
        deleteCardHandler(idCard)
    }
    const onClickUpdateHandler = () => {
        toggleInputHandler(idCard)
    }
    const onClickSaveHandler = () => {
        setUpdateCardHandler(idCard)
    }
    return (
        <div>
            {
                isUpdateInput && currentIdUpdateCard === idCard
                    ? <button className={`${stylesCardsList.tableButton}`}
                              disabled={isLoading || isAnotherUser}
                              onClick={onClickSaveHandler}>
                        save
                    </button>
                    : <button className={`${stylesCardsList.tableButton}`}
                              disabled={isLoading || isAnotherUser}
                              onClick={onClickUpdateHandler}>
                        update
                    </button>
            }
            <button
                onClick={callbackDeleteButton}
                className={`${stylesCardsList.tableButton} ${stylesCardsList.deleteTableButton}`}
                disabled={isLoading || isAnotherUser}>
                delete
            </button>
        </div>
    );
};

export default ActionBlock;
