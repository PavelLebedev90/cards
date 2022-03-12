import React, {ChangeEvent, useState} from 'react';
import stylesForgot from './ForgotPassword.module.css'
import stylesLogin from '../Login/Login.module.css';
import {forgotUserPassword, setError} from '../../BLL/loginReducer';
import {EMAIL_VALIDATOR} from '../Login/Login';
import {useDispatch, useSelector} from 'react-redux';
import Preloader from '../../features/Preloader';
import {RootStateType} from '../../BLL/store';
import {Link} from 'react-router-dom';

const ForgotPassword = () => {
    const [emailState, setEmailState] = useState<string>('')
    const isFetching = useSelector<RootStateType, boolean>(state => state.login.isFetching)
    const error = useSelector<RootStateType, string>(state => state.login.error)
    const dispatch = useDispatch()
    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailState(e.currentTarget.value)
        dispatch(setError(''))
        if (!EMAIL_VALIDATOR.test(e.currentTarget.value)) {
            dispatch(setError('Enter correct email'))
        }
    }
    const forgotData = {
        email: emailState,
        from: 'pashoktver90@gmail.com',
        message: `<div style="background-color: lime; padding: 15px">
                  password recovery link: 
                  <a href='http://localhost:3000/#/set-new-password/$token$'>
                  link</a>
                  </div>`
    }
    const onClickHandler = () => {
        dispatch(forgotUserPassword(forgotData))
    }
    return (
        <div className={stylesLogin.mainBlock}>
            <h1 className={stylesLogin.header}>
                Forgot your password?
            </h1>
            <div className={stylesLogin.inputsBlock}>
                <input type="text"
                       placeholder="Email"
                       value={emailState}
                       onChange={emailHandler}/>
            </div>
            <div className={stylesForgot.description}>
                Enter your email address and we will send you further instructions
            </div>
            <div className={stylesLogin.buttonsBlock}>
                <div className={stylesLogin.error}>{error}</div>
                {isFetching
                    ? <Preloader/>
                    : <button
                        onClick={onClickHandler}
                        disabled={!!error}
                        className={stylesLogin.button}
                    >Send Instructions</button>
                }
            </div>
            <div className={stylesLogin.registration}>
                <div>
                    <span className={stylesLogin.description}>Did you remember your password?</span>
                </div>
                <div className={stylesLogin.toReg}>
                    <Link to={'/login'}>Try logging in</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
