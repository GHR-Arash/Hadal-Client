"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const axios_1 = __importDefault(require("axios"));
class ApiService {
    constructor(apiAccessKey, apiEndpoint) {
        this.apiAccessKey = apiAccessKey;
        this.apiEndpoint = apiEndpoint;
    }
    async sendData(encryptedData, externalId) {
        try {
            const response = await axios_1.default.post(this.apiEndpoint, {
                data: encryptedData,
                externalId: externalId
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiAccessKey}`
                }
            });
            return response.data.refrenceId;
        }
        catch (error) {
            console.error('Error sending data to API:', error);
            throw error;
        }
    }
}
exports.ApiService = ApiService;
