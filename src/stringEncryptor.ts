import crypto from 'crypto';

export class StringEncryptor {
    private privateKey: string;

    constructor(privateKey: string) {
        this.privateKey = privateKey;
    }

    encrypt(data: string): string {
        const buffer = Buffer.from(data, 'utf8');
        const encrypted = crypto.privateEncrypt(this.privateKey, buffer);
        return encrypted.toString('base64');
    }
}
