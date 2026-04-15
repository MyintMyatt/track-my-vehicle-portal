import { useSelector } from "react-redux";
import { useWebSocketHook } from "../../../hooks/use-websocket-hook"
import { getLocationUpdateHook } from "../hooks/get-location-update-hook";

const CarTrackMapView = () => {
    useWebSocketHook();
    
    const { vehicleLocationInfo, isConnected }  = useSelector((state) => state.car_tracking);

    getLocationUpdateHook({ wayId: "123", isConnected });
    
    return(
        <div>
            <h1>Status: {isConnected ? "🟢 Live" : "🔴 Disconnected"}</h1>
            <h3>{vehicleLocationInfo.lat}</h3>
        </div>
    );
}

export default CarTrackMapView;