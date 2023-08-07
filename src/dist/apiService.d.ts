export declare class ApiService {
    private apiAccessKey;
    private apiEndpoint;
    constructor(apiAccessKey: string, apiEndpoint: string);
    sendData(encryptedData: string, externalId: string): Promise<string>;
}
