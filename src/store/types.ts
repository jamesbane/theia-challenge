import {RouterState} from 'react-router-redux';
import {CategoryProps, factoryProps, OffsetProps} from "./utils.params";
export interface AppState {
    isMobile: boolean,
    isTablet: boolean,
    isDesktop: boolean,
    connectModalVisible: boolean,
    load: {
        requesting: boolean,
        loaded: boolean
    },
    isAutoplay: boolean,
    isDarkMode: boolean,
    scrollIsLocked: boolean
}


export interface UserState {
    connectWallet: {
        error: string | null,
        isConnect: boolean,
        requesting: boolean,
    },
    userAccount: {
        balance: number,
        wrappedBalance: number,
        accounts: string[],
        error: string | null,
        requesting: boolean,

        nonce: string,
        signKey: string,
        token: string,
        wallet?: {
            id: number | string,
            username: string
        } | null
    },
    notifications: string[],
    chainId: number,
    wrongNetwork: boolean,
    transactionLogs: {
        result: string[],
    },
    toast: {
        action: boolean,
        description: string
    },
    isCreateAccountVisible: boolean,
    createUser: boolean,
    profile: factoryProps,
    disableAccount: factoryProps,
    betaPopup: boolean
}

export interface State {
    app: AppState,
    user: UserState,
    router: RouterState,
}