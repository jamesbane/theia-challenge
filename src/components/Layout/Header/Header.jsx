import React, {useCallback, useEffect, useState} from 'react';
import cn from 'classnames';
import Button from '../../Button';
import {PAGE_HOME_PATH} from '../../../router/constants';
import {Link} from 'react-router-dom';
import Wallet from './Wallet';

import style from './Header.module.scss';

const isDisableConnected = process.env.REACT_APP_DISABLE_CONNECTED === 'true'

export default function Header(props) {
    const {
        wrapperClass,
        fullWidth,
        isConnected,
        address,
        balance,
        chainId,
        symbol,
        onConnectClick,
        onWalletClick,
        menuOpen,
    } = props;
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = useCallback(() => {
        if (!scrolled && window.scrollY > 1) {
            setScrolled(true);
        } else if (scrolled && window.scrollY < 1) {
            setScrolled(false);
        }
    }, [scrolled]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <header className={cn(style.container, wrapperClass, {
            [style.containerScrolled]: scrolled,
            [style.open]: menuOpen
        })}>
            <div className={style.fade}/>
            <div className={cn(style.content, 'content', {[style.fullWidth]: fullWidth})}>
                <div className={style.left}>
                    <Link className={style.logoLink} 
                        to={PAGE_HOME_PATH} >
                        <span style={{fontSize: '24px', fontWeight: 'bolder'}}>Theia</span>
                    </Link>
                </div>
                {
                    !isDisableConnected && (
                        <div className={style.right}>
                            {isConnected ? (
                                <div className={style.dropdownWrapper}>
                                    <Wallet onClick={onWalletClick} {...{address, chainId, balance, symbol}}/>
                                </div>
                            ) : (
                                <Button
                                    wrapperClass={style.button}
                                    text={'Connect Wallet'}
                                    small
                                    outline
                                    gradient
                                    onClick={onConnectClick}
                                />
                            )}
                        </div>
                    )
                }
            </div>
        </header>
    );
}
