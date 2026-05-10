import { getLocationNameByLatLng } from "../../api/map/map-client";
import { useApi } from "../use-api"

export const useLocationApi = () => {
    const { request, isLoading } = useApi();

    const getLocationName =  ({ lat, lng }) => (
        request(() =>  getLocationNameByLatLng({lat, lng})
        )
    );

    return {
        getLocationName,
        isLoading
    };
}