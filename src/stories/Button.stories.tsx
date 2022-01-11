import React from "react";
import Button from "../components/Button";
import notificationIcon from '../components/Layout/Header/img/notify.png';

export default {
    component: Button,
    title: 'Components/Button',
};

export const basic = () => <Button text={'Basic'}/>;

export const primary = () => <Button primary text={'Primary'} />;

export const colors = () => (
    <div>
        <Button primary blue text={'Primary & Blue'} />
        <Button primary light text={'Primary & Light'} />
        <Button primary gray text={'Primary & Gray'} />
        <Button primary grayDark text={'Primary & GrayDark'} />
        <Button primary gradient text={'Primary & Gradient'} />
    </div>
)

export const size = () => (
    <div>
        <Button small text={'Small'} />
        <Button compact text={'Compact'} />
        <Button primary text={'Primary'} />
    </div>
)

export const withIcon = () => (
    <div>
        <Button primary icon={notificationIcon} iconWidth={20} text={'Button with Icon'} />
        <Button primary iconAlignStart icon={notificationIcon} iconWidth={20} text={'Button with Icon'} />
    </div>
)