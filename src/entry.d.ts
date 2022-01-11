import Web3 from "web3";
import {provider} from "web3-core";
import {compose} from "redux";

declare global {
    interface Window {
        ethereum?: | provider | EthereumProvider | null,
        web3: Web3 | null | undefined,
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}