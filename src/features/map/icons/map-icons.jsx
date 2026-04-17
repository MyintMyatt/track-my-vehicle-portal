import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

export const carIcon = L.icon({
    iconUrl: '/src/assets/car-red-icon.png',
    shadowUrl: markerShadow,
    iconSize: [40, 25],
    iconAnchor: [12, 41]
});

export const currentUserIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

export const wayPointIcon = L.icon({
    iconUrl: '/src/assets/person_black_icon.png',
    shadowUrl: markerShadow,
    iconSize: [20, 25],
    iconAnchor: [5, 32], 
})