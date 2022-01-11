import http from '../../../services/http';

export default class User {
    static fetchNotifications(address: string) {
        return http.get(`wallets/${address}/notifications`);
    }

    static getUserNonceKey(address: string, chainId: number) {
        return http.get(`/wallets/nonce/${address}/chainId/${chainId}`)
    }

    static getToken(address: string, chainId: string, signKey: string, displayName: string, username: string) {
        return http.post('/wallets/login', {
            address,
            chainId,
            sign: signKey,
            displayName,
            username
        })
    }

    static fetchUserInfo(address: string, chainId: string) {
        return http.get(`/wallets/${address}`, {
            params: { chainId }
        });
    }

    static editUserInfo(id: number | string, params?: string) {
        return http.patch(`/wallets/${id}`, params);
    }

    static disableAccount(id: number | string, params: string) {
        return http.post(`/wallets/disable/${id}`, params);
    }

    static verifyFacebook(body: any) {
        return http.post('/wallets/verify-facebook', body);
    }
}
