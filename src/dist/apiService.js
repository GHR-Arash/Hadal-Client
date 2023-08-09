"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
class ApiService {
    constructor(apiEndpoint, apiAccessKey) {
        this.jwtToken = null;
        this.apiEndpoint = apiEndpoint;
        this.apiAccessKey = apiAccessKey;
        this.tokenCachePath = process.env.TOKEN_CACHE_PATH || './defaultTokenCachePath.txt';
    }
    // Private method to handle token caching
    cacheToken(token) {
        fs_1.default.writeFileSync(this.tokenCachePath, token);
    }
    // Private method to load token from cache
    loadTokenFromCache() {
        if (fs_1.default.existsSync(this.tokenCachePath)) {
            return fs_1.default.readFileSync(this.tokenCachePath, 'utf8');
        }
        return null;
    }
    async obtainToken() {
        try {
            const response = await axios_1.default.post(`${this.apiEndpoint}/token`, {
                apiAccessKey: this.apiAccessKey
            });
            if (response.data && response.data.token) {
                this.jwtToken = response.data.token;
                this.cacheToken(response.data.token);
                return response.data.token;
            }
            else {
                throw new Error('Failed to obtain a valid token from the API.');
            }
        }
        catch (error) {
            console.error('Error obtaining token:', error instanceof Error ? error.message : error);
            this.jwtToken = null;
            throw error;
        }
    }
    async getToken() {
        if (this.jwtToken) {
            return this.jwtToken;
        }
        const cachedToken = this.loadTokenFromCache();
        if (cachedToken) {
            this.jwtToken = cachedToken;
            return cachedToken;
        }
        return await this.obtainToken();
    }
    async sendData(encryptedData, externalId) {
        const token = await this.getToken();
        try {
            const response = await axios_1.default.post(`${this.apiEndpoint}/sendData`, encryptedData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error sending data:', error.message);
                const axiosError = error;
                if (axiosError.response && axiosError.response.status === 401) {
                    await this.obtainToken();
                    return await this.sendData(encryptedData, externalId);
                }
            }
            else {
                console.error('An unknown error occurred:', error);
            }
            throw error;
        }
    }
}
exports.ApiService = ApiService;
