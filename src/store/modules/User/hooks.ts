import {useEffect} from 'react';
import {
    connectMetaMask
} from './actions';
import {useDispatch} from 'react-redux';
import {CONNECTION_TYPES} from '../../../components/Layout/ConnectToWalletModal/constants';
import {Dispatch} from "redux";

export function UseUserInit() {
    /*
        Basic initialization logic for the module:
        init scripts, event listeners, etc...
    */
    const dispatch = useDispatch();

    // Init wallet

    useEffect(() => {
        dispatch(connectWallet());
    }, [dispatch]);
}


export const connectWallet = () => (dispatch: Dispatch) => {
    const connectorId = window.localStorage.getItem('connectorId');
    if (connectorId === CONNECTION_TYPES.metamask) {
        dispatch<any>(connectMetaMask());
    } else if (connectorId === CONNECTION_TYPES.walletconnect) {
        // dispatch<any>(connectToWalletConnect());
    }
}