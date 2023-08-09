export declare class EncryptionModule {
    private keyManager;
    private apiService;
    private encryptor;
    private privateKeyPath;
    private apiEndpoint;
    private apiAccessKey;
    constructor(privateKeyOrConfig: string, apiEndpoint?: string, apiAccessKey?: string);
    encryptAndSend(data: string, externalId: string): Promise<string>;
}
export default EncryptionModule;
