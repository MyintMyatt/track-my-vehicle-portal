import { useSelector } from "react-redux";
import { useWebSocketHook } from "../../../hooks/use-websocket-hook"
import { useLocationUpdateHook } from "../hooks/get-location-update-hook";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


let DefaultIcon = L.icon({
    iconUrl: '/src/assets/car-red-icon.png',
    shadowUrl: markerShadow,
    iconSize: [40,25],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


// This helper component centers the map automatically when the vehicle moves
const RecenterMap = ({ lat, lng }) => {
    const map = useMap();
    if (lat && lng) {
        map.setView([lat, lng], map.getZoom());
    }
    return null;
};

const CarTrackMapView = () => {
    useWebSocketHook();

    const { vehicleLocationInfo, isConnected } = useSelector((state) => state.car_tracking);
    const { wayId, lat, lng } = vehicleLocationInfo;

    // initial position
    const position = [lat || 16.8409, lng || 96.1735];

    useLocationUpdateHook({ wayId: "123", isConnected });


   return (
        <div className="w-full h-screen">
            <MapContainer center={position} zoom={15} scrollWheelZoom={true} style={{ height: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {lat !== 0 && (
                    <>
                        <Marker position={position}>
                            <Popup>
                                {wayId || 'Way - 9'} <br /> 
                                Lat: {lat}, Lng: {lng}
                            </Popup>
                        </Marker>
                        {/* Auto-pan map to follow the driver */}
                        <RecenterMap lat={lat} lng={lng} />
                    </>
                )} 
            </MapContainer>
        </div>
    );
}

export default CarTrackMapView;