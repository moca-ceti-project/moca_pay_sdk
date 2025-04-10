export interface CreateTokenResponse {
    token: string;
}

export interface CreateOrderRequest {
    business_id: string;
    order_id: string;
    total_amount: number;
    fiat: string;
    source: string;
    expiration_hours?: number;
}

export interface CreateOrderResponse {
    orderInfo: {
        business_name: string;
        reference_id: string;
        amount: number;
        fiat: string;
        source: string;
    };
    expirationDate: string;
}

export interface ConfigureWebhookRequest {
    business_id: string;
    webhook_url: string;
}
