export declare class ApiService {
    private apiEndpoint;
    private apiAccessKey;
    private jwtToken;
    private readonly tokenCachePath;
    constructor(apiEndpoint: string, apiAccessKey: string);
    private cacheToken;
    private loadTokenFromCache;
    obtainToken(): Promise<string>;
    getToken(): Promise<string>;
    sendData(encryptedData: string, externalId: string): Promise<any>;
}
