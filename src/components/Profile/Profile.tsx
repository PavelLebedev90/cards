import React from 'react';
import styles from './Profile.module.css'


const Profile = () => {
    return (
        <div className={styles.mainBlock}>
            <div className={styles.profileContainer}>
                <h2 className={styles.personalInformation}>Personal information</h2>
                <div>
                    PHOTO
                </div>
                <div className={styles.blockForm}>
                    <div className={styles.inputs}>
                        <input className={styles.input} type="text" placeholder='Nickname' />
                        <input className={styles.input} type="text" placeholder='Email'/>
                    </div>
                    <div className={styles.buttons}>
                        <button className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
                        <button className={`${styles.button} ${styles.saveButton}`}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
