import { getDistanceBetweenPoints, getLocationNameByLatLng } from "../../api/map/map-client";
import { useApi } from "../use-api"

export const useLocationApi = () => {
    const { request, isLoading } = useApi();

    const getLocationName = (params, options = {}) => (
        request(() => getLocationNameByLatLng(params), {
            errorTitle: "Fetch Location Name Failed",
            ...options
        }
        )
    );

    const getTotalDistance = (payload, options = {}) => {
        request(() => getDistanceBetweenPoints(payload), {
            errorTitle: "Calculate Total Distance Failed",
            ...options
        });
    }

    return {
        isLoading,
        getLocationName,
        getTotalDistance
    };
}