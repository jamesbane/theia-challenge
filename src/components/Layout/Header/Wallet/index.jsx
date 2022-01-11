import React, {useEffect, useRef} from 'react';
import {formatBlockchainAddress} from '../../../../utils';
import Web3 from 'web3';
import jazzicon from 'jazzicon';

import style from './Wallet.module.scss';

export default function Wallet(props) {
    const {balance, address, chainId, symbol, onClick} = props;
    const convertedBalance = Web3.utils.fromWei(String(balance));
    const iconContainerRef = useRef(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        if (iconContainerRef && iconContainerRef.current) {
            const icon = jazzicon(isMobile ? 11 : 14, address);

            iconContainerRef.current.innerHTML = '';
            iconContainerRef.current.appendChild(icon);
        }
    }, [iconContainerRef, address, chainId]);

    return (
        <div onClick={onClick} className={style.wallet}>
            <span className={style.walletBalance}>
                {balance > 1 ? convertedBalance.substr(0, 6) : convertedBalance.substr(0, 8)} {symbol}
            </span>
            <span className={style.walletAddress}>
                {formatBlockchainAddress(address)}
                <div ref={iconContainerRef} className={style.walletIcon} />
            </span>
        </div>
    )
}