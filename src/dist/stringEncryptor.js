"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringEncryptor = void 0;
const crypto_1 = __importDefault(require("crypto"));
class StringEncryptor {
    constructor(privateKey) {
        this.privateKey = privateKey;
    }
    encrypt(data) {
        const buffer = Buffer.from(data, 'utf8');
        const encrypted = crypto_1.default.privateEncrypt(this.privateKey, buffer);
        return encrypted.toString('base64');
    }
}
exports.StringEncryptor = StringEncryptor;
