import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { generateJWT } from '../common/signer';
import { NotifyTransactionRequest } from './types';

export interface WalletClient {
    notifyTransaction(data: NotifyTransactionRequest): Promise<void>;
}

export function initWalletClient({
    baseURL,
    walletKey,
}: {
    baseURL: string;
    walletKey: string;
}): WalletClient {
    const client = axios.create({
        baseURL,
        headers: { 'Content-Type': 'application/json' },
    });

    client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const token = generateJWT(walletKey);

        if (config.headers) {
            const headers = config.headers;
            headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
    });

    return {
        async notifyTransaction(data: NotifyTransactionRequest): Promise<void> {
            await client.post('/api/wallets/transactions/watch', data);
        },
    };
}
