import { useEffect } from "react"
import { connectWebSocket, disconnectWebSocket } from "../configuration/stom-client";
import { useDispatch } from "react-redux";
import { backendWebSocketURL, WEB_SOCKET_ENDPOINTS } from "../configuration/api-config";

export const useWebSocketHook = () => {


    const dispatch = useDispatch();
    useEffect(() => {
        connectWebSocket(dispatch);

        return () => {
            disconnectWebSocket(); // this in a cleanup function
        };
    }, [dispatch]);
}