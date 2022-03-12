import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../../BLL/store';
import Preloader from '../../../features/Preloader';
import {logoutUser} from '../../../BLL/loginReducer';
import {Navigate} from 'react-router-dom';
import stylesLogin from '../Login.module.css';
import stylesLogout from './Logout.module.css'
const Logout = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector<RootStateType, boolean>(state => state.login.isFetching)
    const error = useSelector<RootStateType, string>(state => state.login.error)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)

    const isLogout = () => {
        dispatch(logoutUser())
    }
    if (!userId) {
        return <Navigate to={'/login'}/>
    }
    return <div className={stylesLogout.wrapper}>
        {
            isFetching
                ? <Preloader/>
                : <button onClick={isLogout} disabled={!!error} className={stylesLogin.button}>Logout</button>
        }
    </div>

};

export default Logout;
