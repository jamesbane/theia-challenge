import React from 'react'
import cn from 'classnames';
import UserAvatar from '../UserAvatar';
import {formatBlockchainAddress} from '../../utils';

import style from './WalletCard.module.scss';

export default function WalletCard(props) {
    const {wrapperClass, item={}, onSelect, loading} = props;

    return (
        <div
            className={cn(style.container, wrapperClass, {
                [style.loading]: loading
            })}
            onClick={() => onSelect && onSelect(item)}
        >
            <UserAvatar
                wrapperClass={style.avatar}
                image={item.avatar}
                isVerified={item.isVerified}
            />
            <h3 className={style.name}>{item.name}</h3>
            <div className={style.address}>{formatBlockchainAddress(item.address, 3, 4)}</div>
        </div>
    )}