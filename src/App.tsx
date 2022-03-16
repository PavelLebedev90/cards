import React, {useEffect} from 'react';
import './App.css';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import {Navigate, Route, Routes} from 'react-router-dom';
import Registration from './components/Registration/Registration';
import FourZeroFour from './components/404/FourZeroFour';
import {Header} from './components/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {initialization} from './BLL/appReducer';
import {RootStateType} from './BLL/store';
import Preloader from './features/Preloader/Preloader';
import Logout from './components/Login/Logout/Logout';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import SetNewPassword from './SetNewPassword/SetNewPassword';
import PacksList from './components/PacksList/PacksList';
import stylesPack from './components/PacksList/PacksList.module.css';

function App() {
    const dispatch = useDispatch()
    const isInitialization = useSelector<RootStateType, boolean>(state => state.app.isInitialization)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    useEffect(()=>{
        dispatch(initialization())
    },[dispatch])

    if(!isInitialization){
        return <div className={stylesPack.preloader}>
            <Preloader/>
        </div>
    }
    const loginParams = userId? 'Logout' : 'Login'
    return (
        <div>
            <Header login={loginParams}/>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/logout'} element={<Logout/>}/>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/Registration'} element={<Registration/>}/>
                <Route path={'/404'} element={<FourZeroFour/>}/>
                <Route path={'/*'} element={<Navigate to={'404'}/>}/>
                <Route path={'/forgot'} element={<ForgotPassword/>}/>
                <Route path={'/set-new-password/:token'} element={<SetNewPassword/>}/>
                <Route path={'/packs-list'} element={<PacksList/>}/>
            </Routes>
        </div>
    );
}

export default App;
