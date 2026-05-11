import { getLocationNameByLatLng } from "../../api/map/map-client";
import { useApi } from "../use-api"

export const useLocationApi = () => {
    const { request, isLoading } = useApi();

    const getLocationName =  (params, options = {}) => (
        request(() =>  getLocationNameByLatLng(params), {
            errorTitle : "Fetch Location Name Failed",
            ...options
        }
        )
    );

    return {
        getLocationName,
        isLoading
    };
}