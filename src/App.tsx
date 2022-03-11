import React, {useEffect} from 'react';
import './App.css';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import {Navigate, Route, Routes} from 'react-router-dom';
import Registration from './components/registration/Registration';
import FourZeroFour from './components/404/FourZeroFour';
import NewPassword from './components/NewPassword';
import PasswordRecovery from './components/PasswordRecovery';
import SuperTest from './components/SuperTest';
import {Header} from './components/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {initialization} from './BLL/appReducer';
import {RootStateType} from './BLL/store';
import Preloader from './features/Preloader';
import Logout from './components/Login/Logout';

function App() {
    const dispatch = useDispatch()
    const isInitialization = useSelector<RootStateType, boolean>(state => state.app.isInitialization)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    useEffect(()=>{
        dispatch(initialization())
    },[dispatch])

    if(!isInitialization){
        return <div style={
            {fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}
        }>
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
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/404'} element={<FourZeroFour/>}/>
                <Route path={'/*'} element={<Navigate to={'404'}/>}/>
                <Route path={'/newpassword'} element={<NewPassword/>}/>
                <Route path={'/passwordrecovery'} element={<PasswordRecovery/>}/>
                <Route path={'/supertest'} element={<SuperTest/>}/>
            </Routes>
        </div>
    );
}

export default App;
