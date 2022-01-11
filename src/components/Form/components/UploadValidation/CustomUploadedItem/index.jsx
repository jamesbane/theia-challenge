import React from 'react';

import Button from '../../../../Button';
import musicalNote from '../img/musical-note.svg';

import style from './CustomUploadedItem.module.scss';

export default function CustomUploadedItem({type, uploadProps, file}) {
    const renderDefault = () => (
        <div className={style.uploadItem}>
            {type === 'audio' ? <img className={style.uploadImg} src={musicalNote} alt="upload"/> :
                <img className={style.uploadImg} src={file.url} alt="upload"/>}

            <div className={style.darkText}>{file.name}</div>
        </div>
    );

    const renderUploadButton = () => (
        <Button
            wrapperClass={style.uploadBtn}
            onClick={() => uploadProps.onRemove()}
            text={'Change'}
        />
    );

    return (
        <div className={style.container}>
            {renderDefault()}
            {renderUploadButton()}
        </div>
    );
}