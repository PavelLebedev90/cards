import React, {ChangeEvent, useState} from 'react';
import stylesLogin from './Login.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, setError} from '../../BLL/loginReducer';
import Preloader from '../../features/Preloader';
import {RootStateType} from '../../BLL/store';
import {Navigate, NavLink} from 'react-router-dom';


export const EMAIL_VALIDATOR = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const Login = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector<RootStateType, boolean>(state => state.login.isFetching)
    const error = useSelector<RootStateType, string>(state => state.login.error)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const [emailState, setEmailState] = useState<string>('')
    const [passwordState, setPasswordState] = useState<string>('')
    const [rememberMe, setRememberMe] = useState(false)


    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailState(e.currentTarget.value)
        dispatch(setError(''))
        if (!EMAIL_VALIDATOR.test(e.currentTarget.value)) {
            dispatch(setError('Enter correct email'))
        }
    }
    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordState(e.currentTarget.value)
        dispatch(setError(''))
        if (e.currentTarget.value.length < 5) {
            dispatch(setError('Password must be more than 5 characters '))
        }
    }
    const rememberMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    }
    const onClickHandler = () => {
        dispatch(loginUser({
            email: emailState,
            password: passwordState,
            rememberMe: rememberMe
        }))
    }

    if (userId) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={stylesLogin.mainBlock}>
            <h1>It-incubator</h1>
            <h3>
                Sign in
            </h3>
            <div className={stylesLogin.inputsBlock}>
                <input type="text"
                       placeholder="Email"
                       value={emailState}
                       onChange={emailHandler}/>

                <input type="password"
                       placeholder="Password"
                       value={passwordState}
                       onChange={passwordHandler}/>

                <input type="checkbox" checked={rememberMe}
                       onChange={rememberMeHandler}
                /> Remember me

            </div>
            <div className={stylesLogin.buttonsBlock}>
                <div className={stylesLogin.error}>{error}</div>
                {isFetching
                    ? <Preloader/>
                    : <button onClick={onClickHandler} disabled={!!error}>Login</button>
                }
            </div>

            <div className={stylesLogin.registration}>
                <span>or </span>
                <span><NavLink to={'/registration'}>Registration</NavLink></span>
            </div>

        </div>
    );
};

export default Login;
