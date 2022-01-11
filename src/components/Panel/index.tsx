import React from 'react';
import style from './Modal.module.scss';

import cn from 'classnames';

export default function Panel(props) {
    const {wrapperClass, containerClass, maxHeight, children, scroll=true, ...restProps} = props;

    return (
        <div className={cn(style.container, wrapperClass)} {...restProps}>
            <div
                className={cn(containerClass, {
                    [style.scroll]: scroll
                })}
                style={{maxHeight: maxHeight ? `${maxHeight}px`: 'none'}}
            >
                {children}
            </div>
        </div>
    )
}