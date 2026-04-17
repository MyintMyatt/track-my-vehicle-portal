import axios from "axios";
import { apiBaseURL } from "./api-config";

const apiClient = axios.create({
    baseURL: apiBaseURL(),
    timeout: 50000, // 50 seconds
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
});


export default apiClient;