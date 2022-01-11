import React from 'react'
import WalletList from './WalletList';
import {UseWalletItemMethods} from '../../hooks/projects';
import {useSelector} from 'react-redux';

export default function WalletListContainer(props) {
    /*
        The common logic for the list item is defined here
    */
    const {onSelect} = UseWalletItemMethods();
    const {isMobile} = useSelector(state => state.app);

    return (
        <WalletList
            {...{onSelect, isMobile}}
            {...props}
        />
    )}