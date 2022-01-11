import { isEmpty, has } from 'lodash';
import { handleActions } from 'redux-actions';
import {persistReducer} from 'redux-persist';
import localForage from 'localforage';
import {UserState} from "../../types";
import {PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    connectWallet: {
        error: null,
        isConnect: false,
        requesting: false,
    },
    userAccount: {
        balance: 0,
        wrappedBalance: 0,
        accounts: [],
        error: null,
        requesting: false,

        nonce: '',
        signKey: '',
        token: '',
        wallet: null
    },
    notifications: [],
    chainId: 1,
    wrongNetwork: false,
    appliedTermsOfService: false,
    transactionLogs: {
        result: [],
    },
    userInfo: {
        error: null,
        result: {},
        requesting: false,
    },
    profileEdit: {
        result: null,
        requesting: false,
        error: null,
        active: false,
        valid : {
            email: false,
            username: false,
            twitter: false,
            facebook:  false
        },
        profile: {},
        notificationPreferences: {
            newSale: false,
            newBid: false
        },
        linkedAccounts: null
    },
    toast: {
        action: false,
        description: ''
    },
    isCreateAccountVisible: false,
    createUser: false,
    disableAccount: {
        result: null,
        requesting: false,
        error: null,
    },
    profile: {
        error: null,
        result: {},
        requesting: false,
    },
    betaPopup: true
};

let userActions = handleActions<UserState>({
    SET_NOTIFICATIONS: (state, action: PayloadAction<any>) => ({
        ...state,
        notifications: action.payload,
    }),

    SET_APPLIED_TERMS_OF_SERVICE: (state, action: PayloadAction<any>) => ({
        ...state,
        appliedTermsOfService: action.payload,
    }),

    SET_WRONG_NETWORK: (state, action: PayloadAction<any>) => ({
        ...state,
        wrongNetwork: action.payload,
    }),

    SET_USER_NONCE: (state, action: PayloadAction<any>) => ({
        ...state,
        userAccount: {
            ...state.userAccount,
            nonce: action.payload
        }
    }),

    SET_USER_SIGNKEY: (state, action: PayloadAction<any>) => ({
        ...state,
        userAccount: {
            ...state.userAccount,
            signKey: action.payload
        }
    }),

    SET_USER_TOKEN: (state, action: PayloadAction<any>) => ({
        ...state,
        userAccount: {
            ...state.userAccount,
            token: action.payload
        }
    }),

    SET_WALLET: (state, action: PayloadAction<any>) => ({
        ...state,
        userAccount: {
            ...state.userAccount,
            wallet: action.payload
        }
    }),

    SET_NETWORK: (state, action: PayloadAction<any>) => ({
        ...state,
        chainId: parseInt(action.payload),
    }),

    /** SET USER ACCOUNTS **/
    SET_USER_ACCOUNTS: (state, action: PayloadAction<any>) => ({
        ...state,
        userAccount: {
            ...state.userAccount,
            accounts: has(action.payload, 'accounts') ? action.payload.accounts : state.userAccount.accounts,
            balance: has(action.payload, 'balance') ? action.payload.balance : state.userAccount.balance,
            wrappedBalance: has(action.payload, 'wrappedBalance') ? action.payload.wrappedBalance : state.userAccount.wrappedBalance
        },
        connectWallet: {
            ...state.connectWallet,
            ...{ isConnect: has(action.payload, 'accounts') ? !isEmpty(action.payload.accounts) : !isEmpty(state.userAccount.accounts) },
        },
        chainId: has(action.payload, 'chainId') ? parseInt(action.payload.chainId) : state.chainId
    }),

    SET_CREATE_ACCOUNT_VISIBLE: (state, action: PayloadAction<any>) => ({
        ...state,
        isCreateAccountVisible: action.payload
    }),

    /** CONNECT WALLET **/
    CONNECT_WALLET_REQUEST: (state) => ({
        ...state,
        connectWallet: {
            ...state.connectWallet,
            requesting: true,
        },
    }),
    CONNECT_WALLET_SUCCESS: (state) => ({
        ...state,
        connectWallet: {
            ...state.connectWallet,
            requesting: false,
            isConnect: true,
            error: null,
        },
    }),
    CONNECT_WALLET_FAIL: (state, action: PayloadAction<any>) => ({
        ...state,
        connectWallet: {
            ...state.connectWallet,
            requesting: false,
            error: action.payload.error,
        },
    }),


    TOAST_ACTION: (state, action: PayloadAction<any>) => ({
        ...state,
        toast: action.payload,
    }),

    REMOVE_TOAST_ACTION: (state, action: PayloadAction<any>) => ({
        ...state,
        toast: action.payload,
    }),

    FETCH_PROFILE_INFO_REQUEST: (state) => ({
        ...state,
        profile: {
            ...initialState.profile,
            requesting: true
        }
    }),

    DISABLE_ACCOUNT_REQUEST: (state) => ({
        ...state,
        disableAccount: {
            ...state.disableAccount,
            requesting: true,
            error: null,
            result: null
        }
    }),
    DISABLE_ACCOUNT_SUCCESS: (state, action: PayloadAction<any>) => ({
        ...state,
        disableAccount: {
            ...state.disableAccount,
            requesting: false,
            error: null,
            result: action.payload.data
        }
    }),
    DISABLE_ACCOUNT_FAIL: (state, action: PayloadAction<any>) => ({
        ...state,
        disableAccount: {
            ...state.disableAccount,
            requesting: false,
            error: action.payload.error,
            result: null
        }
    })
}, initialState);

const userReducer = persistReducer({
    key: 'user',
    storage: localForage,
    whitelist: ['userAccount', 'connectWallet']
}, userActions);

export default userReducer;
