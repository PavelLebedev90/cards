import React from 'react';
import classesError from './FourZeroFour.module.css'



const FourZeroFour = () => {
    return (
        <div className={classesError.bg}>
            <div className={classesError.wrapper}>
                <div className={classesError.content}>
                    <div className={classesError.firstSymbol}>4</div>
                    <div className={classesError.secondSymbol}>0</div>
                    <div className={classesError.thirdSymbol}>4</div>
                </div>
                <span className={classesError.description}>an error occurred, please try again later</span>
            </div>
        </div>
    );
};

export default FourZeroFour;
