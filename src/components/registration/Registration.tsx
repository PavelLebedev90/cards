import React, {ChangeEvent, useState} from 'react';
import styles from './registration.module.css';
import {registrationApi} from "../../api/registration-api";
import {AxiosError} from "axios";
import {Navigate} from 'react-router-dom';

const Registration = () => {
    const [emailState, setEmailState] = useState<string>('')
    const [passwordState, setPasswordState] = useState<string>('')
    const [confirmPassState, setConfirmPassState] = useState<string>('')
    const [loader, setLoader] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false)

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailState(e.currentTarget.value)
    }
    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordState(e.currentTarget.value)
    }
    const confirmPassHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassState(e.currentTarget.value)
    }
    const registrationOnClick = () => {
        setLoader('sending...')
        if (passwordState !== confirmPassState) {
            setErrorMessage('passwords don\'t match!')
            setLoader('')
        } else {
            registrationApi.registrationUser(emailState, passwordState)
                .then(() => {
                    setErrorMessage('')
                    setRegistrationSuccess(true)
                })
                .catch((error: AxiosError) => {
                    setErrorMessage(error.response?.data.error)
                })
                .finally(() => {
                    setLoader('')
                })
        }
    }
    if (registrationSuccess) {
        return <Navigate to='/profile'/>
    }
    return (
        <div className={styles.mainBlock}>
            <h1>It-incubator</h1>
            <h3>Sign up</h3>
            <div className={styles.inputsBlock}>
                <input type='email'
                       placeholder='Email'
                       value={emailState}
                       onChange={emailHandler}/>

                <input type='password'
                       placeholder='Password'
                       value={passwordState}
                       onChange={passwordHandler}/>

                <input type='password'
                       placeholder='Confirm password'
                       value={confirmPassState}
                       onChange={confirmPassHandler}/>
            </div>
            <div className={styles.buttonsBlock}>
                {loader ? <div style={{color: 'green'}}>{loader}</div> :
                    <button onClick={registrationOnClick}>Register</button>}
            </div>
            {errorMessage && <div style={{color: 'red', marginTop: '10px'}}>{errorMessage}</div>}
        </div>
    );
};

export default Registration;
