import { useEffect } from "react";
import { useLocationApi } from "./use-location-api"

const useCalcuateDistance = (watch, setValue) => {
    const { isLoading, getTotalDistance } = useLocationApi();

    const startLat = watch("start.latitude");
    const startLng = watch("start.longitude");
    const endLat = watch("end.latitude");
    const endLng = watch("end.longitude");
    const distanceUnit = watch("distance_unit");

    useEffect(() => {
        if (startLat && startLng && endLat && endLng) {
            const payload = {
                points: [
                    { lat: parseFloat(startLat), lng: parseFloat(startLng) },
                    { lat: parseFloat(endLat), lng: parseFloat(endLng) },
                ],
                distanceUnit: distanceUnit
            };

            getTotalDistance(payload, {
                showLoader: false,
                onSuccess: (data) => {
                    console.log(data);
                    
                    setValue("total_distance_value", data?.payload.totalDistance);
                }
            });
        }

    }, [startLat, startLng, endLat, endLng, distanceUnit]);

    return { isCalculating: isLoading };
};

export default useCalcuateDistance;