import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import CurrentLocationMarker from "../features/map/components/comp-current-location-marker";

const MapBaseLayout = ({
    parentStyle = 'w-full h-screen',
    children
}) => {
    return (
        <div className={`${parentStyle}`}>
            <MapContainer
                center={[16.8661, 96.1951]}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {children}

                {/* <CurrentLocationMarker /> */}
            </MapContainer>
        </div>
    );
};

export default MapBaseLayout;