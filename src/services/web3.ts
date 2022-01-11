export const getAccountSymbol = (chainId?) => {
    if (chainId === 56 || chainId === 97)
        return 'BNB';
    return 'ETH';
};

export const getAccountWrappedSymbol = (chainId) => {
    if (chainId === 56 || chainId === 97)
        return 'wBNB';
    return 'wETH';
};

export const etherscanApiUrl = chainId => {
    const address = {};
    return address[chainId] || address['0x1'];
};

export const getProvider = chainId => {
    const address = {};
    return address[chainId] || address['0x1'];
};

export const getBlockchain = (
    // chainId
) => {
    return 'ethereum';
};
