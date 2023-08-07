import fs from 'fs';
import { generateKeyPairSync } from 'crypto';

export class KeyManager {
    private keyPath: string;

    constructor(keyPath: string) {
        this.keyPath = keyPath;
    }

    ensurePrivateKeyExists(): void {
        if (!fs.existsSync(this.keyPath)) {
            const { privateKey } = generateKeyPairSync('rsa', {
                modulusLength: 2048,
            });
            fs.writeFileSync(this.keyPath, privateKey.export({ type: 'pkcs1', format: 'pem' }));
        }
    }

    getPrivateKey(): string {
        return fs.readFileSync(this.keyPath, 'utf8');
    }
}
