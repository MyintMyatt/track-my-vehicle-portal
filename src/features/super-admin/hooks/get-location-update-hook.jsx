import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { subscribeToTopic } from "../../../configuration/stom-client";
import { WEB_SOCKET_ENDPOINTS } from "../../../configuration/api-config";
import { updateLocation } from "../reducer/car-tracking-slice";

export const getLocationUpdateHook = ({ wayId , isConnected}) => {
    const dispatch = useDispatch();

    useEffect(() => {

        if(!isConnected) return;

        const unsubscribe = subscribeToTopic(WEB_SOCKET_ENDPOINTS.track_vehicle, (data) => {
            console.log(`recevied data ${data}`);
            
            dispatch(updateLocation(data));
        });

        // Cleanup: Unsubscribe when component unmounts
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [dispatch, wayId, isConnected]);

}