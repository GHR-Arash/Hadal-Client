import fs from 'fs';
import axios from 'axios';

export class ApiService {
    private apiEndpoint: string;
    private apiAccessKey: string;
    private jwtToken: string | null = null;
    private readonly tokenCachePath: string;

    constructor(apiEndpoint: string, apiAccessKey: string) {
        this.apiEndpoint = apiEndpoint;
        this.apiAccessKey = apiAccessKey;
        this.tokenCachePath = process.env.TOKEN_CACHE_PATH || './defaultTokenCachePath.txt';
    }

    // Private method to handle token caching
    private cacheToken(token: string): void {
        fs.writeFileSync(this.tokenCachePath, token);
    }

    // Private method to load token from cache
    private loadTokenFromCache(): string | null {
        if (fs.existsSync(this.tokenCachePath)) {
            return fs.readFileSync(this.tokenCachePath, 'utf8');
        }
        return null;
    }

    async obtainToken(): Promise<string> {
        try {
            const response = await axios.post(`${this.apiEndpoint}/token`, {
                apiAccessKey: this.apiAccessKey
            });

            if (response.data && response.data.token) {
                this.jwtToken = response.data.token;
                this.cacheToken(response.data.token);
                return response.data.token;
            } else {
                throw new Error('Failed to obtain a valid token from the API.');
            }
        } catch (error) {
            console.error('Error obtaining token:', error instanceof Error ? error.message : error);
            this.jwtToken = null;
            throw error;
        }
    }

    async getToken(): Promise<string> {
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

    async sendData(encryptedData: string, externalId: string): Promise<any> {
        const token = await this.getToken();

        try {
            const response = await axios.post(`${this.apiEndpoint}/sendData`, encryptedData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error sending data:', error.message);
                const axiosError = error as any;
                if (axiosError.response && axiosError.response.status === 401) {
                    await this.obtainToken();
                    return await this.sendData(encryptedData, externalId);
                }
            } else {
                console.error('An unknown error occurred:', error);
            }
            throw error;
        }
    }
}
