import React from 'react';
import { useSelector } from 'react-redux';
import Router from './router';
import {UseAppInit} from './store/modules/App/hooks';
import {UseUserInit} from './store/modules/User/hooks';
import Logger from 'js-logger';
import http from './services/http';
import {State} from "./store/types";
import {
    createWeb3ReactRoot,
    Web3ReactProvider
} from '@web3-react/core';
import {Web3Provider} from "@ethersproject/providers";
function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}
const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK');
function App() {
    Logger.useDefaults();

    // Initiate state
    UseAppInit();
    UseUserInit();

    const token = useSelector<State>(state => state.user?.userAccount.token);
    if (token) {
        http.setAuthorizationHeader(token);
    }
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <Router />
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    );
}

export default App;
