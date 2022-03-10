import React, {ChangeEvent, useState} from 'react';
import styles from './registration.module.css';
import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {requestForRegistrationTC, setErrorActionAC} from "../../BLL/registrationPageReducer";

const Registration = () => {
    const dispatch = useDispatch()
    const registrationSuccess = useSelector<RootStateType, boolean>(state => state.registration.successMessage)
    const loader = useSelector<RootStateType, boolean>(state => state.registration.loader)
    const errorMessage = useSelector<RootStateType, string>(state => state.registration.error)
    const [emailState, setEmailState] = useState<string>('')
    const [passwordState, setPasswordState] = useState<string>('')
    const [confirmPassState, setConfirmPassState] = useState<string>('')


    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setErrorActionAC(''))
        setEmailState(e.currentTarget.value)
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
                {loader ? <div style={{color: 'green'}}>sending...</div> :
                    <button onClick={registrationOnClick}>Register</button>}
            </div>
            {errorMessage && <div style={{color: 'red', marginTop: '10px'}}>{errorMessage}</div>}
        </div>
    );
};

export default Registration;
