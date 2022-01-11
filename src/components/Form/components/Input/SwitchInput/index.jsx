import React from 'react';
import {Switch} from 'antd';

import style from './SwitchInput.module.scss';

export default function SwitchInput(props) {
    const {
        id,
        labelText,
        value,
        disabled,
        onChange,
        onFocus,
    } = props;

    return (
        <div className={style.container}>
            {labelText && (
                <label htmlFor={`#${id}`} className={style.label}>
                    {labelText}
                </label>
            )}
            <Switch
                className={style.switch}
                checked={value}
                onChange={() => onChange(!value)}
                {...{id, disabled, onFocus}}
            />
        </div>
    )
}