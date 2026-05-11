import apiClient from "../../configuration/api-client"
import { api_endpoints } from "../../constants/app-api-endpoints"

export const getLocationNameByLatLng = async ({ lat, lng }) => {
    return apiClient.get(api_endpoints.map.name_by_latlng, {
        params: {
            lat,
            lng
        }
    }
    );
}

export const getDistanceBetweenPoints = async (payload) => {
    const { points, distanceUnit } = payload;
    return apiClient.post(`${api_endpoints.map.distance_between_points}?distance-unit=${distanceUnit}`, {
        points
    });
}
// const res = await fetch(
//     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedPoint.lat}&lon=${selectedPoint.lng}`
// );

// const data = await res.json();

