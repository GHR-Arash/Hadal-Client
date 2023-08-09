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
    constructor(privateKeyOrConfig, apiEndpoint, apiAccessKey) {
        if (apiEndpoint && apiAccessKey) {
            // If apiEndpoint and apiAccessKey are provided, use them directly
            this.privateKeyPath = privateKeyOrConfig;
            this.apiEndpoint = apiEndpoint;
            this.apiAccessKey = apiAccessKey;
        }
        else {
            // Otherwise, treat the first parameter as a config file path
            const config = JSON.parse(fs_1.default.readFileSync(privateKeyOrConfig, 'utf8'));
            this.privateKeyPath = config.privateKeyPath;
            this.apiEndpoint = config.apiEndpoint;
            this.apiAccessKey = config.apiAccessKey;
        }
        this.keyManager = new keyManager_1.KeyManager(this.privateKeyPath);
        this.apiService = new apiService_1.ApiService(this.apiEndpoint, this.apiAccessKey);
        this.encryptor = new stringEncryptor_1.StringEncryptor(this.keyManager.getPrivateKey());
    }
    encryptAndSend(data, externalId) {
        const encryptedString = this.encryptor.encrypt(data);
        return this.apiService.sendData(encryptedString, externalId);
    }
}
exports.EncryptionModule = EncryptionModule;
// For default export
exports.default = EncryptionModule;
