import axios from "axios";
import {store} from '../store/store'
import { apiBaseURL } from "./api-config";
import { showErrorModal } from "../global/reducer/global-modal-ui-slice";

const apiClient = axios.create({
    baseURL: apiBaseURL(),
    timeout: 50000, // 50 seconds
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
});

// interceptor for response
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data.messages?.[0] || 'Internal Server Error';

        switch(status){
            case 400:
                store.dispatch(showErrorModal({
                    title: "Bad Request",
                    message: message
                }));
                break;
            case 401:
                store.dispatch(showErrorModal({
                    title: "Unauthorized",
                    message: message
                }));
                break;
            case 403:
                store.dispatch(showErrorModal({
                    title: "Forbidden",
                    message: message || 'You have no permission'
                }));
                break;
            case 404:
                store.dispatch(showErrorModal({
                    title: "Not Found",
                    message: message || 'Resource Missing'
                }));
                break;
            case 405:
                store.dispatch(showErrorModal({
                    title: "Method Not Allowed",
                    message: message || 'Wrong HTTP method.'
                }));
                break;
            case 406:
                store.dispatch(showErrorModal({
                    title: "Not Acceptable",
                    message: message
                }));
                break;
            case 408:
                store.dispatch(showErrorModal({
                    title: "Request Timeout",
                    message: message
                }));
                break;
            case 422:
                store.dispatch(showErrorModal({
                    title: "Validation Error",
                    message: message
                }));
                break;
            case 423:
                store.dispatch(showErrorModal({
                    title: "Locked",
                    message: message || 'Your Accout Locked'
                }));
                break;
            case 429:
                store.dispatch(showErrorModal({
                    title: "Too Many Request",
                    message: message
                }));
                break;
            case 500:
                 store.dispatch(showErrorModal({
                    title: "Internal Server Error",
                    message: message
                }));
                break;
            case 502:
                 store.dispatch(showErrorModal({
                    title: "Bad Gateway",
                    message: message || 'Gateway/proxy problem.'
                }));
                break;

            case 503:
                 store.dispatch(showErrorModal({
                    title: "Service Unavaliable",
                    message: message || 'Maintenance/server down.'
                }));
                break;
            case 504:
                 store.dispatch(showErrorModal({
                    title: "Gateway Timeout",
                    message: message
                }));
                break;
            default:
                 store.dispatch(showErrorModal({
                    title: "Something went wrong",
                    message: message
                }));
                break;

        }
    }
)
export default apiClient;