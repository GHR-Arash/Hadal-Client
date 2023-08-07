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
    getPrivateKey() {
        return fs_1.default.readFileSync(this.keyPath, 'utf8');
    }
}
exports.KeyManager = KeyManager;
