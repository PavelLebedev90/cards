import React from 'react';
import styles from './registration.module.css';

const Registration = () => {
    return (
        <div className={styles.mainBlock}>
            <h1>It-incubator</h1>
            <h3>Sign up</h3>
            <div className={styles.inputsBlock}>
                <input type='text' placeholder='Email'/>
                <input type='text' placeholder='Password'/>
                <input type='text' placeholder='Confirm password'/>
            </div>
            <div className={styles.buttonsBlock}>
                <button>Register</button>
            </div>

        </div>
    );
};

export default Registration;
