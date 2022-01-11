import React, {PureComponent} from 'react';
import classNames from 'classnames';
import Error from '../Error';
import Input from '../Input';

import style from './Field.module.scss';

export default class Field extends PureComponent {
    componentWillUnmount() {
        const {beforeUnmount} = this.props;

        if (beforeUnmount) {
            // Need for the Form component functionality
            beforeUnmount();
        }
    }

    render() {
        const {
            wrapperClass,
            label,
            text,
            labelContent,
            error,
            id,
            hint,
            children,
            small,
            type
        } = this.props;

        return (
            <div className={classNames('field', style.container, wrapperClass, {
                [style.containerSmall]: small
            })}>
                {label && (
                    <span className={style.labelWrapper}>
                        <label htmlFor={id} className={style.label}>
                            {label}
                        </label>
                        {labelContent}
                    </span>
                )}
                {text && (
                    <div className={style.text}>
                        {text}
                    </div>
                )}
                {type && (
                    <Input
                        {...this.props}
                        wrapperClass={style.input}
                    />
                )}
                {children}
                <Error
                    isVisible={!!error}
                    text={error}
                />
                {hint && (
                    <div className={style.hint}>
                        {hint}
                    </div>
                )}
            </div>
        )
    }
}
