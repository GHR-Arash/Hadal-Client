export declare class EncryptionModule {
    private config;
    private keyManager;
    private encryptor;
    private apiService;
    constructor(configPath: string);
    encryptAndSend(data: string, externalId: string): Promise<string>;
}
export default EncryptionModule;
