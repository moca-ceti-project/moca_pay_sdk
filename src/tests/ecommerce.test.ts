import { initEcommerceClient } from "../ecommerce";
import { setupServer } from 'msw/node'
import { handlers, RESPONSES, baseUrl } from './handlers'
import { initWalletClient } from "../wallets";

export const server = setupServer(...handlers)

const BUSINESS_ID = "123";

describe("ecommerce and wallet", () => {
    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    it("should create order", async () => {
        const client = initEcommerceClient({
            businessId: BUSINESS_ID,
            baseURL: baseUrl,
        });
        const order = await client.createOrder({
            business_id: BUSINESS_ID,
            order_id: "123",
            total_amount: 100,
            fiat: "USD",
            source: "ecommerce",
            expiration_hours: 12,
        });
        expect(order).toEqual(RESPONSES.createOrder);
    });

    it("should configure webhook", async () => {
        const client = initEcommerceClient({
            businessId: BUSINESS_ID,
            baseURL: baseUrl,
        });
        await client.configureWebhook({
            "business_id": BUSINESS_ID,
            "webhook_url": "https://yourdomain.com/webhook"
        });
    });

    it("should watch transaction", async () => {
        const walletClient = initWalletClient({
            baseURL: baseUrl,
            walletKey: "test-key",
        })

        await walletClient.notifyTransaction({
            "hash": "transactionHash",
            "to_address": "receivingTokenAddress",
            "protocol": "tokenProtocol",
            "order_id": "orderIdPaid",
            "fiat_code": "USD",
            "fiat_amount": 10.6
        });
    });
});