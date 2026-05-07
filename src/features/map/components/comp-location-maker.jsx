import { useEffect } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { currentUserIcon } from "../icons/map-icons";

const LocationMaker = ({ selectedPoint, setSelectedPoint }) => {
  const map = useMapEvents({
    click(e) {
      setSelectedPoint(e.latlng);
    },
    locationfound(e) {
      setSelectedPoint(e.latlng);
      map.flyTo(e.latlng, 16);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  if (!selectedPoint) return null;

  return (
    <Marker position={selectedPoint} icon={currentUserIcon}>
      <Popup>Selected point</Popup>
    </Marker>
  );
};

export default LocationMaker;