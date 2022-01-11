import React from 'react'
import cn from 'classnames';
import defaultAvatar from '../../assets/svg/defaultAvatar.svg';
import verified from './verified.svg';

import style from './UserAvatar.module.scss';

export default function UserAvatar(props) {
    const {wrapperClass, image, isVerified, onClick} = props;

    return (
        <div
            className={cn(style.container, wrapperClass)}
            style={{backgroundImage: `url(${image ? image : defaultAvatar})`}}
            onClick={onClick}
        >
            {isVerified && (
                <img src={verified} className={style.verified} alt=""/>
            )}
        </div>
    )}