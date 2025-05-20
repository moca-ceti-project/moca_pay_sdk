import { http, HttpResponse } from 'msw'

export const baseUrl = 'https://staging.payment-moca.com'

export const RESPONSES = {
    createOrder: {
        "orderInfo": {
            "business_name": "ecommerceName",
            "reference_id": "orderID",
            "amount": 100,
            "fiat": "USD",
            "source": "ecommerce"
        },
        "expirationDate": "2030-03-13T18:16:05.486503885-06:00"
    },
    authToken: {
        token: "test-token"
    },
}

export const handlers = [
    http.post(`${baseUrl}/api/ecommerce/orders/create`, () => {
        return HttpResponse.json(RESPONSES.createOrder)
    }),
    http.post(`${baseUrl}/api/business/auth/token`, () => {
        return HttpResponse.json(RESPONSES.authToken)
    }),
    http.post(`${baseUrl}/api/ecommerce/webhooks/configure`, () => {
        return HttpResponse.json()
    }),
    http.post(`${baseUrl}/api/wallets/transactions/watch`, () => {
        return HttpResponse.json()
    }),
]