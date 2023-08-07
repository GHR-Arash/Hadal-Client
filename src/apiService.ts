import axios from 'axios';

export class ApiService {
    private apiAccessKey: string;
    private apiEndpoint: string;

    constructor(apiAccessKey: string, apiEndpoint: string) {
        this.apiAccessKey = apiAccessKey;
        this.apiEndpoint = apiEndpoint;
    }

    async sendData(encryptedData: string, externalId: string): Promise<string> {
        try {
            const response = await axios.post(this.apiEndpoint, {
                data: encryptedData,
                externalId: externalId
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiAccessKey}`
                }
            });

            return response.data.refrenceId;
        } catch (error) {
            console.error('Error sending data to API:', error);
            throw error;
        }
    }
}
