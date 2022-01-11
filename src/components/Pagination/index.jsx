import React from 'react';
import cn from 'classnames';
import Button from '../Button';
import right from './right.svg';

import style from './Pagination.module.scss';

export default function Pagination(props) {
    const {length, pageLength, currentPage, onChange, wrapperClass, simple} = props;
    const pages = Math.ceil(length/pageLength);

    return (
        <div className={cn(style.container, wrapperClass)}>
            <Button
                wrapperClass={cn(style.button, style.buttonLeft, style.buttonSmall)}
                icon={right}
                iconClass={style.arrowIcon}
                onClick={() => onChange(currentPage - 1)}
                disabled={currentPage === 1}
                outline
            />
            {!simple && (
                <Button
                    wrapperClass={style.button}
                    text={'First'}
                    onClick={() => onChange(1)}
                    disabled={currentPage === 1}
                    outline
                />
            )}
            <span className={style.label}>
                {currentPage} <span className={style.faded}>of {pages}</span>
            </span>
            {!simple && (
                <Button
                    wrapperClass={style.button}
                    text={'Last'}
                    onClick={() => onChange(pages)}
                    disabled={currentPage === pages}
                    outline
                />
            )}
            <Button
                wrapperClass={cn(style.button, style.buttonSmall)}
                icon={right}
                iconClass={style.arrowIcon}
                onClick={() => onChange(currentPage + 1)}
                disabled={currentPage === pages}
                outline
            />
        </div>
    )
}