import React from 'react';
import {Input} from 'antd';
import cn from 'classnames';

import style from './TextArea.module.scss';

const { TextArea } = Input;

export default function TextAreaInput(props) {
    const {id, value, placeholder, onChange, onFocus,  small} = props;
    return (
        <TextArea
            className={cn(style.container, {[style.containerSmall]: small})}
            {...{id, value, placeholder, onFocus}}
            onChange={e => onChange(e.target.value)}
            autoSize={{ minRows: 4, maxRows: 4 }}
        />
    )
}