import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet-routing-machine";

export const Routing = ({ wayPoints }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: wayPoints.map(p => L.latLng(p.lat, p.lng)),
            lineOptions: {
                styles: [{ color: "#6FA1EC", weight: 5 }] // Grab Green "#00B14F"
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            show: false, // This hides the panel UI
            elementsBeforeContainer: null,
            containerClassName: 'hidden', // Note: This only works if you use a custom control
        }).addTo(map);
        return () => map.removeControl(routingControl);
    }, [map, wayPoints]);

    return null;
}