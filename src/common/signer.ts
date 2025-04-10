import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export function generateHMAC(body: any, secret: string): string {
    const bodyStr = JSON.stringify(body || {});
    return CryptoJS.HmacSHA256(bodyStr, secret).toString();
}

export function generateJWT(secret: string): string {
    return jwt.sign({}, secret, { algorithm: 'HS256' });
}
