import React from 'react';
import cn from 'classnames';
import {useLocation} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import style from './Footer.module.scss';

export default function Footer() {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition timeout={800} classNames={'fade'} key={location.key}>
                <footer className={cn(style.container, 'content content_level_1')}>
                    <div className={style.bottom}>
                        Copyright © 2021 Rebel Blockchain Inc. All Rights Reserved.
                    </div>
                </footer>
            </CSSTransition>
        </TransitionGroup>
    )
}