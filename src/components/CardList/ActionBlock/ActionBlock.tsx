import React from 'react';
import stylesCardsList from "../CardList.module.css";

type ActionBlockType = {
    isAnotherUser: boolean
    idCard: string
    isLoading: boolean
    // deleteCardHandler: (id: string) => void
}

const ActionBlock: React.FC<ActionBlockType> = ({
                                                    isLoading,
                                                    // deleteCardHandler,
                                                    idCard,
                                                    isAnotherUser
                                                }) => {
    const callbackDeleteButton = () => {
        // deleteCardHandler(idCard)
    }
    return (
        <div>
            <button className={`${stylesCardsList.tableButton}`}
                    disabled={isLoading || isAnotherUser}>update
            </button>
            <button
                onClick={callbackDeleteButton}
                className={`${stylesCardsList.tableButton} ${stylesCardsList.deleteTableButton}`}
                disabled={isLoading || isAnotherUser}>delete
            </button>
        </div>
    );
};

export default ActionBlock;
