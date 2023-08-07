import { KeyManager } from './keyManager';
import { StringEncryptor } from './stringEncryptor';
import { ApiService } from './apiService';
import fs from 'fs';

export class EncryptionModule {
    private config: any;
    private keyManager: KeyManager;
    private encryptor: StringEncryptor;
    private apiService: ApiService;

    constructor(configPath: string) {
        this.config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        this.keyManager = new KeyManager(this.config.privateKeyPath);
        this.keyManager.ensurePrivateKeyExists();
        this.encryptor = new StringEncryptor(this.keyManager.getPrivateKey());
        this.apiService = new ApiService(this.config.apiAccessKey, this.config.apiEndpoint);
    }

    encryptAndSend(data: string, externalId: string): Promise<string> {
        const encryptedString = this.encryptor.encrypt(data);
        return this.apiService.sendData(encryptedString, externalId);
    }
}

// For default export
export default EncryptionModule;
