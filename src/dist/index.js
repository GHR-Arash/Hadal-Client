"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionModule = void 0;
const keyManager_1 = require("./keyManager");
const stringEncryptor_1 = require("./stringEncryptor");
const apiService_1 = require("./apiService");
const fs_1 = __importDefault(require("fs"));
class EncryptionModule {
    constructor(configPath) {
        this.config = JSON.parse(fs_1.default.readFileSync(configPath, 'utf-8'));
        this.keyManager = new keyManager_1.KeyManager(this.config.privateKeyPath);
        this.keyManager.ensurePrivateKeyExists();
        this.encryptor = new stringEncryptor_1.StringEncryptor(this.keyManager.getPrivateKey());
        this.apiService = new apiService_1.ApiService(this.config.apiAccessKey, this.config.apiEndpoint);
    }
    encryptAndSend(data, externalId) {
        const encryptedString = this.encryptor.encrypt(data);
        return this.apiService.sendData(encryptedString, externalId);
    }
}
exports.EncryptionModule = EncryptionModule;
// For default export
exports.default = EncryptionModule;
