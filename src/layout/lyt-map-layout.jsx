import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import CurrentLocationMarker from "../features/map/components/comp-current-location-marker";
import { Routing } from "../features/map/components/comp-routing";

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

                <Routing wayPoints={[
                    { lat: 16.8661, lng: 96.1951 },
                    { lat: 16.8700, lng: 96.2000 },
                    { lat: 16.8800, lng: 96.2100 }
                ]} />

                {/* <CurrentLocationMarker /> */}
            </MapContainer>
        </div>
    );
};

export default MapBaseLayout;