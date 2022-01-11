import React from 'react';
import {Input} from 'antd';

import style from './TextInput.module.scss';
import cn from 'classnames';

export default function NumberInput(props) {
    const {
        id,
        idCreateSong,
        regexCreatSong,
        value,
        disabled,
        prefix,
        placeholder,
        onChange,
        onFocus,
        light,
        icon,
        small,
        min,
        suffix,
        type,
        royalType,
        defaultValue,
        wrapperClass
    } = props;
 
    const prefixIcon = prefix ? prefix : <img src={icon} className={style.prefix} alt=""/>;
    const suffixIcon = suffix ? suffix : <img src={icon} className={style.prefix} alt=""/>;

    const FLOAT_REGEX = /^-?\d*(\.\d*)?$/;
    const INTEGER_REGEX = /^\d+$/;

    const handleChange = (value) => {
        const reg = type === 'integer' ? INTEGER_REGEX : (idCreateSong ? regexCreatSong : FLOAT_REGEX);
        if ((!isNaN(value) && reg.test(value))) {
            // use parseFloat(value) at onChange will make it impossible to enter decimals
            onChange(type === 'integer' ? parseInt(value) : value);
        }
    };

    return (
        <Input
            className={cn(style.container, wrapperClass, {
                [style.containerLight]: light,
                [style.containerIcon]: icon,
                [style.containerSmall]: small
            })}
            prefix={prefixIcon}
            suffix={suffixIcon}
            onChange={e => {
                royalType ? onChange(parseInt(e.target.value)) : handleChange(e.target.value)
            }}
            type='text'
            {...{id, value, min, placeholder, onFocus, disabled, defaultValue}}
        />
    )
}