import Web3 from 'web3';
import {get} from 'lodash';
import {createAction, createActions} from 'redux-actions';
import Logger from 'js-logger';
import {ALLOWED_NETWORKS} from './constants';
import User from './api';
import http from '../../../services/http';
import {message} from 'antd';
import {Dispatch} from "redux";
import {State} from "../../types";

export const setNotifications = createAction('SET_NOTIFICATIONS');
export const setAppliedTermsOfService = createAction('SET_APPLIED_TERMS_OF_SERVICE');
export const setChainId = createAction('SET_NETWORK');
export const setWrongNetwork = createAction('SET_WRONG_NETWORK');
export const setUserAccounts = createAction('SET_USER_ACCOUNTS');
export const setUserNonce = createAction('SET_USER_NONCE');
export const setUserSignKey = createAction('SET_USER_SIGNKEY');
export const setUserToken = createAction('SET_USER_TOKEN');
export const setWallet = createAction('SET_WALLET');
export const setCreateAccountVisible = createAction('SET_CREATE_ACCOUNT_VISIBLE');
// export const clearUserDataOnDisconnectMetamask = createAction('CLEAR_USER_DATA_ON_DISCONNECT_METAMASK');
export const agreeBetaNiter = createAction('AGREE_BETA_NIFTER');

const {connectWalletRequest, connectWalletSuccess, connectWalletFail} = createActions({
    CONNECT_WALLET_REQUEST: () => {
    },
    CONNECT_WALLET_SUCCESS: data => ({data}),
    CONNECT_WALLET_FAIL: error => ({error})
});


export const setNetwork = (chainId: number) => (dispatch: Dispatch) => {
    dispatch(setChainId(chainId));
    dispatch<any>(validateNetwork(chainId));
};

export const validateNetwork = (chainId: number) => (dispatch: Dispatch, getState: () => State) => {
    const {wrongNetwork} = getState().user;

    if (chainId) {
        const hexChainId = `${chainId.toString().slice(0, 2) === '0x' ? '' : '0x'}${chainId.toString(16)}`;
        const isValid = ALLOWED_NETWORKS.indexOf(hexChainId) !== -1;

        if (!isValid) {
            dispatch(setWrongNetwork(true));
        } else if (isValid) {
            dispatch(setWrongNetwork(false));
        }
    } else if (wrongNetwork) {
        dispatch(setWrongNetwork(false));
    }
};

export const connectMetaMask = () => async (dispatch: Dispatch) => {
    dispatch(connectWalletRequest());
    // Check metamask is install or not
    if (window.ethereum) {
        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.
        window.web3 = new Web3(window.ethereum);

        window.ethereum.on('accountsChanged', async (accounts: string[]) => {
            await clearUserInfo(dispatch);
            if (accounts && accounts[0]) {
                const chainId = parseInt(window.ethereum?.chainId);
                const balance = await window.web3?.eth.getBalance(accounts[0]);

                dispatch(setUserAccounts({accounts, balance}));
                dispatch<any>(setNetwork(chainId));
                const {data} = await User.getUserNonceKey(accounts[0], chainId);
                dispatch(setUserNonce(data));
                dispatch<any>(checkUserToken());
            } else {
                dispatch<any>(disconnect());
            }
        });

        window.ethereum.on('chainChanged', async (chainId) => {
            await clearUserInfo(dispatch);
            window.web3 = new Web3(window.ethereum);
            const accounts = await window.web3.eth.getAccounts();
            let balance;

            dispatch<any>(setNetwork(chainId));
            if (ALLOWED_NETWORKS.indexOf(chainId) === -1) {
                return dispatch<any>(disconnect());
            }

            if (accounts && accounts[0]) {
                balance = await window.web3.eth.getBalance(accounts[0]);
                dispatch(setUserAccounts({accounts, balance, chainId}));

                const {data} = await User.getUserNonceKey(accounts[0], chainId);
                dispatch(setUserNonce(data));
                dispatch<any>(checkUserToken());
            } else {
                dispatch<any>(disconnect());
            }
        });

        return window.ethereum.request({method: 'eth_requestAccounts'})
            .then(async () => {
                dispatch(connectWalletSuccess());
                const chainId = parseInt(window.ethereum.chainId);
                if (ALLOWED_NETWORKS.indexOf(window.ethereum.chainId) === -1) {
                    return dispatch(setWrongNetwork(true));
                } else {
                    dispatch(setWrongNetwork(false));
                }
                const accounts = await window.web3?.eth.getAccounts();
                if (!accounts || accounts?.length === 0)
                    return;
                const balance = await window.web3?.eth.getBalance(accounts[0]);
                const {data} = await User.getUserNonceKey(accounts[0], chainId);

                dispatch<any>(setNetwork(chainId));
                dispatch(setUserAccounts({accounts, balance, chainId}));
                dispatch(setUserNonce(data));

                dispatch<any>(checkUserToken());

                window.localStorage.setItem('nonce', data.nonce);

                return true;
            })
            .catch(() => {
                dispatch(connectWalletFail());
                return false;
            });

    } else {
        return new Promise<string>((resolve, reject) => {
            const err = 'Metamask not install.';
            dispatch(connectWalletFail(err));

            reject(err);
        });
    }
};

const clearUserInfo = async dispatch => {
    await dispatch(setUserAccounts({accounts: []}));
    await dispatch(setUserToken(''));
    await dispatch(setWallet({}));
    await dispatch(setUserNonce({}));
    await dispatch(setWrongNetwork(false));
    window.localStorage.removeItem('connectorId');
    window.localStorage.removeItem('walletconnect');
    window.localStorage.removeItem('nonce');
    http.setAuthorizationHeader('');
    // window.localStorage.removeItem('appliedTerms');
};

export const disconnect = () => async dispatch => {
    // TODO: implement logic
    await clearUserInfo(dispatch);
    window.web3 = undefined;
    window.location.href = window.location.origin;
};

export const web3Auth = (address, chainId, displayName?, username?, isNew = false) => async (dispatch, getState) => {
    const nonce = getState().user.userAccount?.nonce?.nonce;
    try {
        const signKey = isNew ? await window.web3?.eth.personal.sign(nonce, address, '') : null;
        const {data} = await User.getToken(address, chainId, signKey ?? '', displayName, username);

        dispatch(setUserSignKey(signKey));
        dispatch(setUserToken(data.token));
        dispatch(setWallet(data.wallet));
        http.setAuthorizationHeader(data.token);
        dispatch(setCreateAccountVisible(false))
    } catch (e) {
        let mess = get(e, 'data.message', '');
        if (mess.indexOf('duplicate')) {
            mess = 'username already exists, please use other one.'.toUpperCase();
        } else {
            mess = 'Server error, please try again later.'.toUpperCase();
        }
        message.error(mess);
        Logger.error(e);
    }
};

export const toastAction = createAction('TOAST_ACTION');
export const removeToast = createAction('REMOVE_TOAST_ACTION');


/** Disable account **/
const {disableAccountRequest, disableAccountSuccess, disableAccountFail} = createActions({
    DISABLE_ACCOUNT_REQUEST: () => {
    },
    DISABLE_ACCOUNT_SUCCESS: data => (data),
    DISABLE_ACCOUNT_FAIL: error => ({error})
});

export const disableAccount = () => (dispatch, getState) => {
    const id = getState().user.userInfo.result?.id;

    dispatch(disableAccountRequest());

    return User.editUserInfo(id).then(({data}) => {
        return dispatch(disableAccountSuccess(data));
    }).catch(error => {
        return dispatch(disableAccountFail(error));
    });
};

export const checkUserToken = () => (dispatch, getState) => {
    const nonce = getState().user.userAccount.nonce;
    const address = getState().user.userAccount?.accounts?.[0] ?? '';
    const chainId = getState().user.chainId;
    if (nonce.isNew) {
        dispatch(setCreateAccountVisible(true));
    } else {
        dispatch(setCreateAccountVisible(false));
        dispatch(web3Auth(address, chainId));
    }
};