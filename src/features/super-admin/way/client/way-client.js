import apiClient from "../../../../configuration/api-client";
import { api_endpoints } from "../../../../constants/app-api-endpoints";

export const createWay = async (formDataPayload) => {
    return apiClient.post(api_endpoints.way.save, formDataPayload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};