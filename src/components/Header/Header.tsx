
import React from 'react';
import stylesHeader from './Header.module.css'
import {NavLink} from "react-router-dom";


export function Header() {
    return (
        <div className={stylesHeader.wrapper}>
            <nav className={stylesHeader.nav}>
                <span><NavLink to={'/'}
                               className={(navData) => navData.isActive ? `${stylesHeader.nav_link}` : ''}>Profile</NavLink> </span>
                <span><NavLink to={'/login'}
                               className={(navData) => navData.isActive ? `${stylesHeader.nav_link}` : ''}>Login</NavLink></span>
                <span><NavLink to={'/registration'}
                               className={(navData) => navData.isActive ? `${stylesHeader.nav_link}` : ''}>Registration</NavLink></span>
                <span><NavLink to={'/newpassword'}
                               className={(navData) => navData.isActive ? `${stylesHeader.nav_link}` : ''}>New password</NavLink></span>
                <span><NavLink to={'/passwordrecovery'}
                               className={(navData) => navData.isActive ? `${stylesHeader.nav_link}` : ''}>Password recovery</NavLink></span>
                <span><NavLink to={'/supertest'}
                               className={(navData) => navData.isActive ? `${stylesHeader.nav_link}` : ''}>Super test</NavLink></span>
            </nav>
        </div>
    )
}
