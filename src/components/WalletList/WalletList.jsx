import React, {useEffect, useRef} from 'react'
import cn from 'classnames';
import Button from '../Button';
import next from './next.svg';
import {LIST_TYPES} from './constants';
import WalletCard from '../WalletCard';

import loadingImage from '../../assets/img/loading.png';

import style from './TrackList.module.scss';

export default function WalletList(props) {
    const {
        wrapperClass,
        items=[],
        onLoadMore,
        loading,
        title,
        buttonText,
        onButtonClick,
        onSelect,
        type=LIST_TYPES.GRID,
        trackClass,
        listClass,
        isMobile
    } = props;

    const isScroll = type === LIST_TYPES.SCROLL && isMobile;

    const containerRef = useRef(null);
    const lastElementRef = useRef(null);

    useEffect(() => {
        const containerEl = containerRef.current;
        const lastEl = lastElementRef.current;
        let observer;

        if (containerEl && lastEl) {
            setTimeout(() => {
                const callback = (entries, observer) => {


                    entries.forEach(entry => {
                        if (entry.intersectionRatio > 0) {
                            if (onLoadMore) {
                                onLoadMore()
                            }

                            observer.unobserve(entry.target);
                        }
                    })
                };

                observer = new IntersectionObserver(callback, {
                    root: null,
                    rootMargin: '0px',
                    threshold: 1.0
                });

                observer.observe(lastEl);
            }, 1000);

            return () => {
                if (observer) {
                    observer.unobserve(lastEl)
                }
            }
        }

    }, [lastElementRef, lastElementRef, items.length]);

    return (
        <div
            ref={containerRef}
            className={cn(style.container, wrapperClass, {
                [style.loading]: loading,
                [style.scrollType]: type === LIST_TYPES.SCROLL
            })}
        >
            {(title || buttonText) && (
                <div className={style.top}>
                    {title && (
                        <h3 className={style.title}>
                            {title}
                        </h3>
                    )}
                    {buttonText && (
                        <Button
                            wrapperClass={style.button}
                            text={buttonText}
                            onClick={onButtonClick}
                            icon={next}
                            iconClass={style.buttonIcon}
                        />
                    )}
                </div>
            )}
            <ul className={cn(style.tracks, listClass)}>
                {items && items.map((item, key, items) => (
                    <li ref={key === items.length-1 ? lastElementRef : null} key={key}>
                        <WalletCard wrapperClass={cn(style.track, trackClass)} {...{item, onSelect}}/>
                    </li>
                ))}
                {(!items || !items.length > 0) && loading && (
                    new Array(4).fill({}).map((item, key, items) => (
                        <li ref={key === items.length-1 ? lastElementRef : null} key={key}>
                            <WalletCard wrapperClass={cn(style.track, trackClass)} loading/>
                        </li>
                    ))
                )}
                {(items && items.length > 0) && loading && isScroll && (
                    <img src={loadingImage} alt="" className={cn(style.spinner, style.spinnerScroll)}/>
                )}
            </ul>
            {(items && items.length > 0) && loading && !isScroll && (
                <img src={loadingImage} alt="" className={style.spinner}/>
            )}
        </div>
    )}