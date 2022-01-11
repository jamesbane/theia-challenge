import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../../Modal';
import ProviderList from './ProviderList';
import {CONNECTION_TYPES, PROVIDER_ITEMS} from './constants';
import Button from '../../Button';
import {connectMetaMask} from '../../../store/modules/User/actions';

import style from './ConnectToWalletModal.module.scss';
import {State} from "../../../store/types";
import {useWeb3React} from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export default function ConnectToWalletModal(props) {
    const {activate} = useWeb3React<Web3Provider>();
    const { wrapperClass, onCancel, ...restProps } = props;
    const [selectedItem, setSelectedItem] = useState(null);
    const requesting = useSelector<State>(state => (state.user.connectWallet.requesting));
    const error = useSelector<State>(state => (state.user.connectWallet.error));
    const dispatch = useDispatch();

    const dispatchConnect = () => dispatch(connectMetaMask());
    const onSelect = async (item) => {
        setSelectedItem(item);
        window.localStorage.setItem('connectorId', item.connector);
        if (item.connector === CONNECTION_TYPES.metamask) {
            dispatchConnect();
        } else {
            await activate(item.wallet);
        }
    };

    return (
        <Modal
            wrapperClass={wrapperClass}
            title={renderTitle(selectedItem, setSelectedItem)}
            width={'390px'}
            onCancel={onCancel}
            {...restProps}
        >
            <ProviderList
                items={PROVIDER_ITEMS}
                selectedItem={selectedItem}
                onSelect={onSelect}
                onRepeat={onSelect}
                requesting={requesting}
                error={error}
            />
        </Modal>
    );
}

function renderTitle(selectedItem, setSelectedItem) {
    if (selectedItem) {
        return (
            <Button
                wrapperClass={style.back}
                onClick={() => setSelectedItem(null)}
                text={'Back'}
            />
        );
    }
    return 'Connect to a Wallet';
}
