import axios from 'axios';
import { generateHMAC } from '../common/signer';
import {
    CreateTokenResponse,
    CreateOrderRequest,
    CreateOrderResponse,
    ConfigureWebhookRequest,
} from './types';

export interface EcommerceClient {
    createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse>;
    configureWebhook(data: ConfigureWebhookRequest): Promise<void>;
}

export function initEcommerceClient({
    businessId,
    baseURL,
}: {
    businessId: string;
    baseURL: string;
}): EcommerceClient {
    const client = axios.create({
        baseURL,
        headers: { 'Content-Type': 'application/json' },
    });

    async function getToken(): Promise<string> {
        const response = await client.post<CreateTokenResponse>('/api/business/auth/token', {
            business_id: businessId,
        });
        return response.data.token;
    }

    async function signAndPost<T>(url: string, data: any): Promise<T> {
        const token = await getToken();
        const hash = generateHMAC(data, token);
        const response = await client.post<T>(url, data, {
            headers: { 'X-Hash': hash },
        });
        return response.data;
    }

    return {
        async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
            return await signAndPost<CreateOrderResponse>('/api/ecommerce/orders/create', data);
        },

        async configureWebhook(data: ConfigureWebhookRequest): Promise<void> {
            await signAndPost<void>('/api/ecommerce/webhooks/configure', data);
        },
    };
}
