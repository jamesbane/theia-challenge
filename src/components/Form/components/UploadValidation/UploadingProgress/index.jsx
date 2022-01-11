import React from 'react';
import style from './UploadingProgress.module.scss';
import {Progress} from 'antd';


import uploadIcon from '../img/upload-default.png';
import cancelIcon from '../img/cancel.svg'


export default function UploadingProgress({ progress, title }) {
    const renderDefault = () => (
        <div className={style.uploadItem}>
            <img className={style.uploadImg} src={uploadIcon} alt="upload" />
            <div>
                {title &&
                    <div className={style.darkText}>{title} <span className={style.greyText}>(Uploading)</span></div>
                }
                <Progress className={style.uploadInfo} percent={progress} />
            </div>
        </div>
    );

    const renderUploadButton = () => (
        <span role='button'>
            <img src={cancelIcon} width={'30px'} />
        </span>
    );

    return (
        <div className={style.container}>
            {renderDefault()}
            {renderUploadButton()}
        </div>
    );
}