import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import ReactModal from 'react-modal';
import stylesModule from './Modal.module.css'
import {ModalCRUDType} from '../../components/PacksList/TablePacks/TablePacks';
import {useDispatch} from 'react-redux';
import {setOpenModal} from '../../BLL/appReducer';

ReactModal.setAppElement('#root')

type DefaultModalPropsType = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
type ModalType = DefaultModalPropsType & {
    closing: (modal: ModalCRUDType) => void
    modalIsOpen: boolean
    width: number
    height: number
    modalAction: ModalCRUDType
    setModalIsOpen: (value: boolean) => void
}

const Modal = ({closing, modalIsOpen, width, height, ...props}: ModalType) => {
    const dispatch = useDispatch()

    function onRequestClose(modalAction: ModalCRUDType) {
        closing(modalAction)
    }

    function close() {
        props.setModalIsOpen(false)
        dispatch(setOpenModal(false))
    }

    return (
        <ReactModal isOpen={modalIsOpen}
                    closeTimeoutMS={200}
                    preventScroll={true}
                    onRequestClose={close}
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 1000,
                            backgroundColor: 'rgba(0,0,0,0.15)'
                        },
                        content: {
                            position: 'absolute',
                            width: `${width}px`,
                            height: `${height}px`,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            border: '1px solid #ccc',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '10px'
                        }
                    }}

        >
            <>
                <div className={stylesModule.closeModal} onClick={() => onRequestClose(props.modalAction)}>

                </div>
                {props.children}
            </>
        </ReactModal>
    );
};

export default Modal;
