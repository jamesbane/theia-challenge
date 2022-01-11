import React from 'react';

import { isEmpty } from 'lodash';

import uploadIcon from '../img/upload-default.png';

import Button from '../../../../Button';

import style from './CustomUpload.module.scss';

const formatAudio = 'MP3 or WAV Max 100MB';
const formatImage = 'PNG, JPG, SVG or PDF Max 10MB';

export default function CustomUpload({ fileList, type, title, subtitle }) {
    const renderDefault = () => (
        <div style={{ display: !isEmpty(fileList) && 'none' }} className={style.uploadItem}>
            <img className={style.uploadImg} src={uploadIcon} alt="upload" />
            <div>
                {title &&
                    <div className={style.darkText}>{title} <span className={style.greyText}>{subtitle}</span></div>
                }
                <p className={style.uploadInfo}>
                    {type === 'audio' ? formatAudio : formatImage}
                </p>
            </div>
        </div>
    );

    const renderUploadButton = () => (
        <Button
            wrapperClass={style.uploadBtn}
            text={'Upload'}
        />
    );

    // const renderAfterUpload = () => (
    //     <div className={style.afterUploadItem}>
    //         <section onClick={() => uploadProps.onRemove()} className={style.rightItem}>
    //             <Button wrapperClass={style.uploadBtn} text={'Change'} />
    //         </section>
    //     </div>
    // );

    return (
        <div className={style.container}>
            {renderDefault()}
            {isEmpty(fileList) && renderUploadButton()}
        </div>
    );
}