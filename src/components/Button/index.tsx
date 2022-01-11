import React from 'react';
import cn from 'classnames';
import spinner from './spinner.png';

import style from './Button.module.scss';

export default function Button(props) {
    const {
        // PROPS
        wrapperClass,
        text,
        children,
        icon,
        iconWidth,
        iconClass,
        iconAlignStart = false,
        preventDefault = false,
        stopPropagation = false,
        disabled,
        loading,

        // EVENTS
        onClick,

        // STYLES
        // --sizes--
        primary,
        compact,
        small,
        // --colors--
        light,
        blue,
        green,
        dark,
        gray,
        grayDark,
        gradient,
        gradientReverse,
        // --misc--
        outline
    } = props;

    const buttonIcon = icon && getIconLayout(icon, iconAlignStart, iconClass, iconWidth);

    return (
        <button
            onClick={e => !disabled && !loading && handleClick(e, onClick, preventDefault, stopPropagation)}
            disabled={disabled || loading}
            className={cn(style.button, wrapperClass, {
                [style.buttonCompact]: compact,
                [style.buttonPrimary]: primary,
                [style.buttonSmall]: small,
                [style.buttonBlue]: blue,
                [style.buttonDark]: dark,
                [style.buttonGreen]: green,
                [style.buttonLight]: light,
                [style.buttonGray]: gray,
                [style.buttonGrayDark]: grayDark,
                [style.buttonGradient]: gradient,
                [style.buttonGradientReverse]: gradientReverse,
                [style.buttonOutline]: outline,
                [style.buttonDisabled]: disabled || loading,
            })}
        >
            {!loading && iconAlignStart && buttonIcon}
            {!loading && text && (
                <span className={style.text}>
                    {text} 
                </span>
            )}
            {!loading && children}
            {!loading && !iconAlignStart && buttonIcon}
            {loading && (
                <img src={spinner} alt="" className={style.spinner}/>
            )}
        </button>
    )
}

function handleClick(e, callback, preventDefault, stopPropagation) {
    if (preventDefault) {
        e.preventDefault();
    }

    if (stopPropagation) {
        e.stopPropagation();
    }

    if (callback) {
        callback(e);
    }
}

function getIconLayout(icon, alignStart, className, width) {
    let iconStyle = width ? {width} : {};
    if (typeof icon === 'string') {
        return (
            <img
                className={cn(style.icon, className, {
                    [style.iconAlignStart]: alignStart,
                })}
                style={iconStyle}
                src={icon}
                alt={'icon'}
            />
        )
    }

    return (
        <span
            className={cn(style.icon, className, {
                [style.iconAlignStart]: alignStart,
            })}
            style={style}
        >
            {icon}
        </span>
    )
}