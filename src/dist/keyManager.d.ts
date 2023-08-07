export declare class KeyManager {
    private keyPath;
    constructor(keyPath: string);
    ensurePrivateKeyExists(): void;
    getPrivateKey(): string;
}
