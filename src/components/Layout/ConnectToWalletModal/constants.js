import metamask from './img/metamask.png';
import frameIcon from './img/frame.svg';
import trezorIcon from './img/trezor.png';
import ledgerIcon from './img/ledger.jpeg';
import { FrameConnector } from '@web3-react/frame-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
export const PROVIDER_TYPES = {
    METAMASK: 'MetaMask',
    FRAME: 'Frame',
    TREZOR: 'Trezor',
    LEDGER: 'Ledger'
};

export const CONNECTION_TYPES = {
    metamask: 'metamask',
    frame: 'frame',
    trezor: 'trezor',
    ledger: 'ledger'
};
const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    4: 'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213',
};

export const frame = new FrameConnector({ supportedChainIds: [1] });
export const trezor = new TrezorConnector({
    chainId: 1,
    url: RPC_URLS[1],
    pollingInterval: POLLING_INTERVAL,
    manifestEmail: 'dummy@abc.xyz',
    manifestAppUrl: 'http://localhost:3000',
});
export const ledger = new LedgerConnector({
    chainId: 1,
    url: RPC_URLS[1],
    pollingInterval: POLLING_INTERVAL,
});

export const PROVIDER_ITEMS = [
    {
        name: PROVIDER_TYPES.METAMASK,
        connector: CONNECTION_TYPES.metamask,
        description: 'Easy to use browser extension.',
        picture: metamask
    },
    {
        name: PROVIDER_TYPES.FRAME,
        connector: CONNECTION_TYPES.frame,
        description: 'Easy to use browser extension.',
        wallet: frame,
        picture: frameIcon
    },
    {
        name: PROVIDER_TYPES.TREZOR,
        connector: CONNECTION_TYPES.trezor,
        description: 'Easy to use browser extension.',
        wallet: trezor,
        picture: trezorIcon
    },
    {
        name: PROVIDER_TYPES.LEDGER,
        connector: CONNECTION_TYPES.ledger,
        description: 'Easy to use browser extension.',
        wallet: ledger,
        picture: ledgerIcon
    }
]