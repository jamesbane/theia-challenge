import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAccountSymbol} from '../../../services/web3';
import Header from './Header';
import {setConnectModalVisible} from '../../../store/modules/App/actions';
import {connectMetaMask} from '../../../store/modules/User/actions';
import {AppState, State} from '../../../store/types';

export default function HeaderContainer(props) {
    /*
      Use container to interact with external data sources (store, api, etc.)
    */
    const dispatch = useDispatch();

    const [isLeaveDropdown, setLeaveDropdown] = useState(false);

    const {isMobile, isTablet} = useSelector<State, AppState>(state => state.app);


    // WALLET
    const isConnected = useSelector<State>(state => state.user?.connectWallet.isConnect);
    const token = useSelector<State>(state => state.user?.userAccount?.token);
    const address = useSelector<State>(state => state.user?.userAccount.accounts ? state.user.userAccount.accounts[0] : '');
    const balance = useSelector<State>(state => state.user?.userAccount.balance ?? 0);
    // const wrappedBalance = useSelector(state => state.user?.userAccount.wrappedBalance ?? 0);
    const chainId = useSelector<State>(state => state.user?.chainId);
    const symbol = getAccountSymbol(chainId);
    const onConnectClick = () => dispatch(setConnectModalVisible(true));
    const loaded = useSelector<State>(state => state.app?.load.loaded);

    useEffect(() => {
        if (loaded && isConnected && token) {
            dispatch(connectMetaMask());
        }
    }, [loaded])

    //TODO implement a relevant data
    const userBalanceData = 0;

    return (
        <Header
            {...props}
            {...{
                isMobile,
                isTablet,
                token,
                isConnected,
                isLeaveDropdown,
                address,
                balance,
                chainId,
                symbol,
                onConnectClick,

                userBalanceData,
                setLeaveDropdown,
            }}
        />
    )
}
