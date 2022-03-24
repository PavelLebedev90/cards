import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {fetchUserTC, updateUserNameTC} from "../../BLL/profileReducer";
import {Navigate} from 'react-router-dom';
import avatar from '../../common/profile/avatar/Avatar.svg'
import plus from '../../common/profile/avatar/Plus.svg'
import Preloader from "../../features/Preloader/Preloader";

const Profile = () => {
    const loader = useSelector<RootStateType, boolean>(state => state.profile.loader)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const userEmail = useSelector<RootStateType, string>(state => state.login.user.email)
    const [nameState, setName] = useState<string>('')
    const [email, setEmail] = useState<string>(userEmail)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchUserTC())
    }, [])

    const nicknameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const userEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onClickHandler = () => {
        dispatch(updateUserNameTC({
            name: nameState
        }))
    }

    if (!userId) {
        return (
            <Navigate to={'/login'}/>
        )
    }

    return (
        <div className={styles.mainBlock}>
            <h1 className={styles.personalInformation}>Personal information</h1>
            <div className={styles.imageBlock}>
                <img src={avatar} alt="avatar"
                     className={styles.imgAvatar}
                />
                <img src={plus} alt="addAvatar"
                     className={styles.imgAddAvatar}
                />
            </div>
            <div className={styles.inputsBlock}>
                <input className={styles.input} type="text" placeholder='Nickname'
                       onChange={nicknameHandler}/>
                <input className={styles.input} type="text" placeholder='Email' value={email}
                       onChange={userEmailHandler}/>
            </div>
            {loader
                ? <Preloader/>
                : <div className={`${styles.buttonsBlock} ${styles.buttonsBlockPosition}`}>
                    <button className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
                    <button className={`${styles.button} ${styles.saveButton}`} onClick={onClickHandler}>Save</button>
                </div>
            }
        </div>
    );
};

export default Profile;
