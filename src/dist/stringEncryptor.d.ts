export declare class StringEncryptor {
    private privateKey;
    constructor(privateKey: string);
    encrypt(data: string): string;
}
