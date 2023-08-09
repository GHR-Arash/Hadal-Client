import fs from 'fs';
import { generateKeyPairSync,createPrivateKey,createPublicKey } from 'crypto';


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
    generatePrivateKey() {
        const { privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
            },
        });
        fs.writeFileSync(this.keyPath, privateKey);
        console.log(`Private key saved to: ${this.keyPath}`);
        
        // Generate the corresponding public key
        this.generatePublicKey();
    }
    

    generatePublicKey() {
        const privateKey = fs.readFileSync(this.keyPath, 'utf8');
        const key = createPrivateKey(privateKey);
        const publicKey = createPublicKey(key);
        const publicKeyPath = this.keyPath.replace('private', 'public');
        fs.writeFileSync(publicKeyPath, publicKey.export({ type: 'pkcs1', format: 'pem' }));
        console.log(`Public key saved to: ${publicKeyPath}`);
    }
    


    getPrivateKey(): string {
        return fs.readFileSync(this.keyPath, 'utf8');
    }
}
