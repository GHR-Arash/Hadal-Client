import { KeyManager } from './keyManager';
import { StringEncryptor } from './stringEncryptor';
import { ApiService } from './apiService';


import fs from 'fs';

export class EncryptionModule {
    private keyManager: KeyManager;
    private apiService: ApiService;
    private encryptor: StringEncryptor;
    
    private privateKeyPath: string;
    private apiEndpoint: string;
    private apiAccessKey: string;

    constructor(privateKeyOrConfig: string, apiEndpoint?: string, apiAccessKey?: string) {
        if (apiEndpoint && apiAccessKey) {
            // If apiEndpoint and apiAccessKey are provided, use them directly
            this.privateKeyPath = privateKeyOrConfig;
            this.apiEndpoint = apiEndpoint;
            this.apiAccessKey = apiAccessKey;
        } else {
            // Otherwise, treat the first parameter as a config file path
            const config = JSON.parse(fs.readFileSync(privateKeyOrConfig, 'utf8'));
            this.privateKeyPath = config.privateKeyPath;
            this.apiEndpoint = config.apiEndpoint;
            this.apiAccessKey = config.apiAccessKey;
        }

        this.keyManager = new KeyManager(this.privateKeyPath);
        this.apiService = new ApiService(this.apiEndpoint, this.apiAccessKey);
        this.encryptor = new StringEncryptor(this.keyManager.getPrivateKey());
    }

    encryptAndSend(data: string, externalId: string): Promise<string> {
        const encryptedString = this.encryptor.encrypt(data);
        return this.apiService.sendData(encryptedString, externalId);
    }
}

// For default export
export default EncryptionModule;
