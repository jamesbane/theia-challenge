import React from 'react';
import {Input} from 'antd';
import cn from 'classnames';
import Button from '../../../../Button';

import style from './LinkInput.module.scss';

export default function LinkInput(props) {
    const {
        id,
        onClick,
        buttonText,
        value,
        disabled,
        prefix,
        placeholder,
        onChange,
        onFocus,
        light,
        icon,
        email,
        small
    } = props;
    const prefixIcon = prefix ? prefix : <img src={icon} className={style.prefix} alt=""/>;

    return (
        <Input
            className={cn(style.container, {
                [style.containerLight]: light,
                [style.containerIcon]: icon,
                [style.containerSmall]: small
            })}
            prefix={prefixIcon}
            suffix={buttonText && (
                <Button
                    wrapperClass={style.link}
                    text={buttonText}
                    onClick={onClick}
                />
            )}
            onChange={e => onChange(e.target.value)}
            type={email}
            {...{id, value, placeholder, onFocus, disabled}}
        />
    )
}