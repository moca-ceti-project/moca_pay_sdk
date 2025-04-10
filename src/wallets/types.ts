export interface NotifyTransactionRequest {
    hash: string;
    to_address: string;
    protocol: string;
    order_id: string;
    fiat_code: string;
    fiat_amount: number;
}
