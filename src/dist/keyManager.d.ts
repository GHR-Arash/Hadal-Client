export declare class KeyManager {
    private keyPath;
    constructor(keyPath: string);
    ensurePrivateKeyExists(): void;
    generatePrivateKey(): void;
    generatePublicKey(): void;
    getPrivateKey(): string;
}
