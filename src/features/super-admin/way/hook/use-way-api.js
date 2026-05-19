import { useApi } from "../../../../hooks/use-api";
import { createWay } from "../client/way-client";


export const useWayApi = () => {
    const { request, isLoading } = useApi();

    const saveWay = (formDataPayload, options = {}) => {
        return request(
            () => createWay(formDataPayload), 
            {
                errorTitle: "Create Route Failed",
                ...options
            }
        );
    };

    return {
        isLoading,
        saveWay
    };
};