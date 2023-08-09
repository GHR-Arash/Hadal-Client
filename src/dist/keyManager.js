"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyManager = void 0;
const fs_1 = __importDefault(require("fs"));
const crypto_1 = require("crypto");
class KeyManager {
    constructor(keyPath) {
        this.keyPath = keyPath;
    }
    ensurePrivateKeyExists() {
        if (!fs_1.default.existsSync(this.keyPath)) {
            const { privateKey } = (0, crypto_1.generateKeyPairSync)('rsa', {
                modulusLength: 2048,
            });
            fs_1.default.writeFileSync(this.keyPath, privateKey.export({ type: 'pkcs1', format: 'pem' }));
        }
    }
    generatePrivateKey() {
        const { privateKey } = (0, crypto_1.generateKeyPairSync)('rsa', {
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
        fs_1.default.writeFileSync(this.keyPath, privateKey);
        console.log(`Private key saved to: ${this.keyPath}`);
        // Generate the corresponding public key
        this.generatePublicKey();
    }
    generatePublicKey() {
        const privateKey = fs_1.default.readFileSync(this.keyPath, 'utf8');
        const key = (0, crypto_1.createPrivateKey)(privateKey);
        const publicKey = (0, crypto_1.createPublicKey)(key);
        const publicKeyPath = this.keyPath.replace('private', 'public');
        fs_1.default.writeFileSync(publicKeyPath, publicKey.export({ type: 'pkcs1', format: 'pem' }));
        console.log(`Public key saved to: ${publicKeyPath}`);
    }
    getPrivateKey() {
        return fs_1.default.readFileSync(this.keyPath, 'utf8');
    }
}
exports.KeyManager = KeyManager;
