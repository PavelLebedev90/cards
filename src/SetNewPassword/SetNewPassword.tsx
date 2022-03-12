import React, {ChangeEvent, useState} from 'react';
import stylesLogin from '../components/Login/Login.module.css';
import {setError, setUserPassword} from '../BLL/loginReducer';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import eyeOff from '../logo/eye/eyeOff.svg';
import eye from '../logo/eye/eye.svg';
import stylesForgot from '../components/ForgotPassword/ForgotPassword.module.css';
import Preloader from '../features/Preloader';
import {RootStateType} from '../BLL/store';
import {useParams} from 'react-router-dom';

const SetNewPassword = () => {
    const dispatch = useDispatch()
    const [passwordState, setPasswordState] = useState<string>('')
    const [visible, setVisible] = useState(false)
    const error = useSelector<RootStateType, string>(state => state.login.error)
    const isFetching = useSelector<RootStateType, boolean>(state => state.login.isFetching)
    const sendNewPassword = useSelector<RootStateType, boolean>(state => state.login.sendNewPassword)
    const {token} = useParams()
    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordState(e.currentTarget.value)
        dispatch(setError(''))
        if (e.currentTarget.value.length < 5) {
            dispatch(setError('Password must be more than 5 characters '))
        }
    }
    const inputType = visible ? 'text' : 'password';
    const logoSrc = visible ? eyeOff : eye;

    const onClickHandler = () => {
        dispatch(setUserPassword({
            password: passwordState,
            resetPasswordToken: token ? token : ''
        }))
    }
    if (sendNewPassword) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={stylesLogin.mainBlock}>
            <h1 className={stylesLogin.header}>
                Create new password
            </h1>
            <div className={stylesLogin.inputsBlock}>
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
            </div>
            <div className={stylesForgot.description}>
                Create new password and we will send you further instructions to email
            </div>
            <div className={stylesLogin.buttonsBlock}>
                <div className={stylesLogin.error}>{error}</div>
                {isFetching
                    ? <Preloader/>
                    : <button
                        disabled={!!error}
                        onClick={onClickHandler}
                        className={stylesLogin.button}
                    >Send Instructions</button>
                }
            </div>
            <div className={stylesLogin.registration}>

            </div>
        </div>
    );
};

export default SetNewPassword;
