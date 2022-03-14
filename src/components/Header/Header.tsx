import React from 'react';
import stylesHeader from './Header.module.css'
import {NavLink} from "react-router-dom";

type HeaderType = {
    login: string
}

export function Header({login}:HeaderType) {

    return (
        <div className={stylesHeader.wrapper}>
            <nav className={stylesHeader.nav}>
                <span><NavLink to={'/'}
                               className={(navData) => navData.isActive ? `${stylesHeader.nav_link}` : ''}>Profile</NavLink> </span>
                <span><NavLink to={`/${login.toLowerCase()}`}
                               className={(navData) => navData.isActive ? `${stylesHeader.nav_link}` : ''}>{login}</NavLink></span>
                <span><NavLink to={'/packs-list'}
                               className={(navData) => navData.isActive ? `${stylesHeader.nav_link}` : ''}>Packs list</NavLink></span>
            </nav>
        </div>
    )
}
