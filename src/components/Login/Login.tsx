import React, {ChangeEvent, useState} from 'react';
import stylesLogin from './Login.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, setError} from '../../BLL/loginReducer';
import Preloader from '../../features/Preloader';
import {RootStateType} from '../../BLL/store';
import {Navigate, Link} from 'react-router-dom';
import eye from './../../logo/eye/eye.svg'
import eyeOff from './../../logo/eye/eyeOff.svg'

export const EMAIL_VALIDATOR = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const Login = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector<RootStateType, boolean>(state => state.login.isFetching)
    const error = useSelector<RootStateType, string>(state => state.login.error)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const [emailState, setEmailState] = useState<string>('')
    const [passwordState, setPasswordState] = useState<string>('')
    const [rememberMe, setRememberMe] = useState(false)
    const [visible, setVisible] = useState(false)
    const [id, setId] = useState(0)
    const [valid, setValid] = useState(false)

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value
            setEmailState(value)
            setValid(false)
            clearTimeout(id)
            setId(0)
            dispatch(setError(''))
            let ident = setTimeout(() => {
                if (!EMAIL_VALIDATOR.test(value)) {
                    dispatch(setError('Enter correct email'))
                }else{
                    setValid(true)
                    dispatch(setError(''))
                }
            }, 2000)
            setId(+ident)
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
    const inputType = visible ? 'text' : 'password';
    const logoSrc = visible ? eyeOff : eye;

    return (
        <div className={stylesLogin.mainBlock}>
            <h1 className={stylesLogin.header}>
                Sign in
            </h1>
            <div className={stylesLogin.inputsBlock}>
                <input type="text"
                       placeholder="Email"
                       value={emailState}
                       onChange={emailHandler}/>

                <span className={stylesLogin.inputPassword}>
                    <input type={inputType}
                           placeholder="Password"
                           value={passwordState}
                           onChange={passwordHandler}/>

                         <img src={logoSrc} alt="logo"
                             className={stylesLogin.eye}
                             onClick={() => setVisible(!visible)}
                     />

                </span>
                <input type="checkbox" className={stylesLogin.checkbox} id={stylesLogin.checkbox}
                       checked={rememberMe}
                       onChange={rememberMeHandler}
                />
                <label htmlFor={stylesLogin.checkbox}>Remember me</label>

            </div>
            <div className={stylesLogin.buttonsBlock}>
                <div className={stylesLogin.error}>{error}</div>
                {isFetching
                    ? <Preloader/>
                    : <button onClick={onClickHandler}
                              disabled={!!error || !valid}
                              className={stylesLogin.button}
                    >Login</button>
                }
            </div>
            <div className={stylesLogin.registration}>
                <div className={stylesLogin.forgot}>
                    <Link to={'/forgot'}>
                        Forgot Password
                    </Link>
                </div>
                <div>
                    <span className={stylesLogin.description}>Don’t have an account? </span>
                </div>
                <div className={stylesLogin.toReg}>
                    <Link to={'/registration'}>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
