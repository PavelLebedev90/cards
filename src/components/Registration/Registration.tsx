import React, {ChangeEvent, useState} from 'react';
import stylesRegistration from './Registration.module.css';
import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {requestForRegistrationTC, setErrorActionAC} from '../../BLL/registrationPageReducer';
import eyeOff from "../../logo/eye/eyeOff.svg";
import eye from "../../logo/eye/eye.svg";
import Preloader from "../../features/Preloader/Preloader";
import {EMAIL_VALIDATOR} from "../Login/Login";

const Registration = () => {
    const dispatch = useDispatch()
    const registrationSuccess = useSelector<RootStateType, boolean>(state => state.registration.successMessage)
    const loader = useSelector<RootStateType, boolean>(state => state.registration.loader)
    const errorMessage = useSelector<RootStateType, string>(state => state.registration.error)
    const [emailState, setEmailState] = useState<string>('')
    const [passwordState, setPasswordState] = useState<string>('')
    const [confirmPassState, setConfirmPassState] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [valid, setValid] = useState<boolean>(true)
    const [id, setId] = useState<number>(0)


    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        dispatch(setErrorActionAC(''))
        setEmailState(value)
        setValid(false)
        clearTimeout(id)
        setId(0)
        let ident = setTimeout(() => {
            if (!EMAIL_VALIDATOR.test(value)) {
                dispatch(setErrorActionAC('Enter correct email'))
            } else {
                setValid(true)
                dispatch(setErrorActionAC(''))
            }
        }, 1500)
        setId(+ident)
    }
    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setErrorActionAC(''))
        setPasswordState(e.currentTarget.value)
    }
    const confirmPassHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setErrorActionAC(''))
        setConfirmPassState(e.currentTarget.value)
    }

    const registrationOnClick = () => {
        dispatch(requestForRegistrationTC(emailState, passwordState, confirmPassState))
    }

    if (registrationSuccess) {
        return <Navigate to='/profile'/>
    }
    const inputType = visible ? 'text' : 'password';
    const logoSrc = visible ? eyeOff : eye;

    return (
        <div className={stylesRegistration.mainBlock}>
            <h1 className={stylesRegistration.header}>Sign up</h1>
            <div className={stylesRegistration.inputsBlock}>
                <input type='email'
                       placeholder='Email'
                       value={emailState}
                       onChange={emailHandler}/>
                <span className={stylesRegistration.inputPassword}>
                    <input type={inputType}
                           placeholder='Password'
                           value={passwordState}
                           onChange={passwordHandler}/>
                    <img src={logoSrc} alt="logo"
                         className={stylesRegistration.eye}
                         onClick={() => setVisible(!visible)}
                    />
                </span>
                <input type={inputType}
                       placeholder='Confirm password'
                       value={confirmPassState}
                       onChange={confirmPassHandler}/>
            </div>
            <div className={`${stylesRegistration.buttonsBlock} ${stylesRegistration.buttonsBlockPosition}`}>
                <div className={stylesRegistration.error}>{errorMessage}</div>
                {loader
                    ? <Preloader/>
                    : <button onClick={registrationOnClick}
                              disabled={!!errorMessage || !valid}
                              className={stylesRegistration.button}
                    >Register</button>}
            </div>
        </div>
    );
};

export default Registration;
