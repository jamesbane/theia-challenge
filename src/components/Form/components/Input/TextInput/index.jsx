import React from 'react';
import {Input} from 'antd';
import cn from 'classnames';

import style from './TextInput.module.scss';

export default function TextInput(props) {
    const {id, value, disabled, prefix, placeholder, onChange, onFocus, light, icon, email, small, suffix, wrapperClass} = props;
    const prefixIcon = prefix ? prefix : <img src={icon} className={style.prefix} alt=""/>;
    const suffixIcon = suffix ? suffix : <img src={icon} className={style.prefix} alt=""/>;

    return (
        <Input
            className={cn(style.container, wrapperClass, {
                [style.containerLight]: light,
                [style.containerIcon]: icon,
                [style.containerSmall]: small
            })}
            prefix={prefixIcon}
            suffix={suffixIcon}
            onChange={e => onChange(e.target.value)}
            type={id ?? email}
            {...{id, value, placeholder, onFocus, disabled}}
        />
    )
}