import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {fetchUserTC, updateUserNameTC} from "../../BLL/profileReducer";
import {useNavigate} from 'react-router-dom';
import Preloader from "../../features/Preloader";


const Profile = () => {
    const loader = useSelector<RootStateType, boolean>(state => state.profile.loader)
    const [nameState, setName] = useState<string>('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
            dispatch(fetchUserTC())
    }, [])

    const nicknameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const onClickHandler = () => {
        dispatch(updateUserNameTC({
            name: nameState
        }))
    }

    return (
        <div className={styles.mainBlock}>
            <div className={styles.profileContainer}>
                <h2 className={styles.personalInformation}>Personal information</h2>
                <div>
                    PHOTO
                </div>
                <div className={styles.blockForm}>
                    <div className={styles.inputs}>
                        <input className={styles.input} type="text" placeholder='Nickname' onChange={nicknameHandler}/>
                        <input className={styles.input} type="text" placeholder='Email' value={''}/>
                    </div>
                    <div className={styles.buttons}>
                            <button className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
                        {loader
                            ? <Preloader/>
                            : <button className={`${styles.button} ${styles.saveButton}`} onClick={onClickHandler}>Save</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
