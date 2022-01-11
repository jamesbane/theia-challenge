import React from 'react';
import cn from 'classnames';
import {InputNumber} from 'antd';
import Button from '../../../../Button';
import maxIcon from './max.png';

import style from './ExchangeInput.module.scss';

export default function ExchangeInput(props) {
    const {
        id,
        labelLeft,
        labelRight,
        max,
        min,
        icon,
        iconLabel,
        symbol,
        showMaxButton,
        value=0,
        onChange,
        onFocus,
        allowInput=true,
        disabled,
        wrapperClass
    } = props;
    return (
        <div className={style.container}>
            <div className={style.top}>
                <span>{labelLeft}</span>
                <span>{labelRight}</span>
            </div>
            <div className={cn(style.bottom, wrapperClass)}>
                <InputNumber
                    className={style.input}
                    {...{id, value, onFocus, max, min}}
                    onChange={value => allowInput && onChange(value)}
                    bordered={false}
                    value={value || ''}
                    placeholder={'0.0'}
                    disabled={!allowInput || disabled}
                />
                <div className={style.bottomRight}>
                    {showMaxButton && !disabled && (
                        <Button
                            wrapperClass={style.button}
                            icon={maxIcon}
                            iconWidth={42}
                            onClick={() => onChange(max)}
                        />
                    )}
                    <div className={style.sign}>
                        {icon && <img src={icon} className={style.icon} alt="icon" />}
                        {iconLabel && <p className={style.iconLabel}>{iconLabel}</p>}
                        {symbol}
                    </div>
                </div>
            </div>

        </div>
    )
}