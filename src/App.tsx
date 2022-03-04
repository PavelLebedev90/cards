import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import Profile from './components/Profile';
import {Navigate, Route, Routes} from 'react-router-dom';
import Registration from './components/Registration';
import FourZeroFour from './components/404/FourZeroFour';
import NewPassword from './components/NewPassword';
import PasswordRecovery from './components/PasswordRecovery';
import SuperTest from './components/SuperTest';

function App() {
    return (
        <div>
            <Routes>
                <Route path={'login'} element={ <Login/>}/>
                <Route path={'profile'} element={ <Profile/>}/>
                <Route path={'registration'} element={ <Registration/>}/>
                <Route path={'404'} element={ <FourZeroFour/>}/>
                <Route path={'*'} element={ <Navigate to={'404'}/>}/>
                <Route path={'newpassword'} element={ <NewPassword/>}/>
                <Route path={'passwordrecovery'} element={ <PasswordRecovery/>}/>
                <Route path={'supertest'} element={ <SuperTest/>}/>
            </Routes>
        </div>
    );
}

export default App;
