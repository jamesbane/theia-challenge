import React from 'react'
import style from './TabNavigation.module.scss';
import {Tabs} from 'antd';
import cn from 'classnames';

const {TabPane} = Tabs;

export default function TabNavigation(props) {
    const {wrapperClass, ...restProps} = props;

    return (
        <Tabs
            {...restProps}
            className={cn(style.tabs, wrapperClass)}
            defaultActiveKey="1"
        />
    )
}

export function TabNavigationPane(props) {
    const {wrapperClass, ...restProps} = props;
    return <TabPane className={cn(style.tabPane, wrapperClass)} {...restProps}/>
}