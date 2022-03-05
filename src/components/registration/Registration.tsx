import React, {ChangeEvent, useState} from 'react';
import styles from './registration.module.css';

const Registration = () => {
    const [emailState, setEmailState] = useState<string>('')
    const [passwordState, setPasswordState] = useState<string>('')
    const [confirmPassState, setConfirmPassState] = useState<string>('')

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailState(e.currentTarget.value)
    }
    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordState(e.currentTarget.value)
    }
    const confirmPassHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassState(e.currentTarget.value)
    }
    return (
        <div className={styles.mainBlock}>
            <h1>It-incubator</h1>
            <h3>Sign up</h3>
            <div className={styles.inputsBlock}>
                <input type='text'
                       placeholder='Email'
                       value={emailState}
                       onChange={emailHandler}/>

                <input type='text'
                       placeholder='Password'
                       value={passwordState}
                       onChange={passwordHandler}/>

                <input type='text'
                       placeholder='Confirm password'
                       value={confirmPassState}
                       onChange={confirmPassHandler}/>
            </div>
            <div className={styles.buttonsBlock}>
                <button>Register</button>
            </div>

        </div>
    );
};

export default Registration;
