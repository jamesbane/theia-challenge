import React from 'react';
import {InputNumber} from 'antd';
import cn from 'classnames';

import style from './TokenAmountInput.module.scss';

export default function TokenAmountInput(props) {
    const {wrapperClass, onChange, value, tokenSymbol, tokenIcon, selectedToken, min, max, ...restProps} = props;

    return (
        <div className={cn(style.container, wrapperClass)}>
            <InputNumber
                className={style.input}
                value={value}
                onChange={value => onChange(value, selectedToken)}
                min={min}
                max={max}
                bordered={false}
                {...restProps}
            />
            {(tokenIcon || tokenSymbol) && (
                <div className={style.tokenInfo}>
                    <div className={style.tokenIcon} style={{backgroundImage: `url(${tokenIcon})`}}/>
                    {tokenSymbol}
                </div>
            )}
        </div>
    )
}