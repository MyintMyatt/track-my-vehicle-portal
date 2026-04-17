import { useSelector } from "react-redux";
import { useWebSocketHook } from "../../../hooks/use-websocket-hook"
import { useLocationUpdateHook } from "../hooks/get-location-update-hook";
import { CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import CurrentLocationMarker from "../../map/components/comp-current-location-marker";
import { carIcon, wayPointIcon } from "../../map/icons/map-icons";


// This helper component centers the map automatically when the vehicle moves
const RecenterMap = ({ lat, lng }) => {
    const map = useMap();
    if (lat && lng) {
        map.setView([lat, lng], map.getZoom());
    }
    return null;
};

const CarTrackMapView = () => {

    // for car real time tracking
    // useWebSocketHook();

    const { vehicleLocationInfo, isConnected } = useSelector((state) => state.car_tracking);
    const { wayId, lat, lng } = vehicleLocationInfo;

    // initial position
    const position = [lat || 16.8409, lng || 96.1735];

    // useLocationUpdateHook({ wayId: "123", isConnected });

    // for way points info
    const { pointsInfo } = useSelector((state) => state.way_points_info);

    return (
        <div className="w-full h-screen">
            <MapContainer center={position} zoom={15} scrollWheelZoom={true} style={{ height: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                // way points
                {
                    pointsInfo.map((info, index) => {
                        console.log(info.lat);

                        return (
                            <Marker
                                key={index}
                                position={[info.lat, info.lng]}
                                icon={wayPointIcon}
                            >
                                <Popup>
                                    Waypoint: {index + 1}
                                </Popup>
                            </Marker>
                        );
                    })
                }

                // draw line between points

                <Polyline
                    positions={pointsInfo.map(p => [p.lat, p.lng])}
                    pathOptions={{ color: 'blue', weight: 5}}               
                >
                </Polyline>

                // car location
                {lat !== 0 && (
                    <>
                        <Marker position={position} icon={carIcon}>
                            <Popup>
                                {wayId || 'Way - 9'} <br />
                                Lat: {lat}, Lng: {lng}
                            </Popup>
                        </Marker>
                        {/* Auto-pan map to follow the driver */}
                        <RecenterMap lat={lat} lng={lng} />
                    </>
                )}

                {/* current location */}
                {/* <CurrentLocationMarker /> */}
            </MapContainer>
        </div>
    );
}

export default CarTrackMapView;