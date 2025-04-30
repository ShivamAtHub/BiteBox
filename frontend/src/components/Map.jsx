import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icons with better visibility
const restaurantIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3911/3911692.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const deliveryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const driverIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/535/535137.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Component to handle map updates
const MapUpdater = ({ center, zoom, driverLocation }) => {
  const map = useMap();
  
  useEffect(() => {
    if (driverLocation) {
      map.setView([driverLocation.lat, driverLocation.lng], zoom, {
        animate: true,
        duration: 1
      });
    } else {
      map.setView(center, zoom, {
        animate: true,
        duration: 1
      });
    }
  }, [center, zoom, driverLocation, map]);

  return null;
};

const Map = ({ restaurantLocation, deliveryLocation, driverLocation, status }) => {
  const [driverPath, setDriverPath] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (driverLocation) {
      setDriverPath(prev => [...prev, [driverLocation.lat, driverLocation.lng]]);
    }
  }, [driverLocation]);

  const center = [
    (restaurantLocation.lat + deliveryLocation.lat) / 2,
    (restaurantLocation.lng + deliveryLocation.lng) / 2
  ];

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        whenCreated={map => { mapRef.current = map; }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <Marker position={[restaurantLocation.lat, restaurantLocation.lng]} icon={restaurantIcon}>
          <Popup>Restaurant Location</Popup>
        </Marker>
        
        <Marker position={[deliveryLocation.lat, deliveryLocation.lng]} icon={deliveryIcon}>
          <Popup>Delivery Location</Popup>
        </Marker>
        
        {driverLocation && (
          <Marker 
            position={[driverLocation.lat, driverLocation.lng]} 
            icon={driverIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-medium">Your Driver</p>
                <p className="text-gray-600">Status: {status}</p>
                <p className="text-gray-600">
                  Location: {driverLocation.lat.toFixed(4)}, {driverLocation.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
        
        <Polyline 
          positions={[
            [restaurantLocation.lat, restaurantLocation.lng],
            [deliveryLocation.lat, deliveryLocation.lng]
          ]}
          color="#3b82f6"
          weight={3}
          dashArray="5, 5"
        />
        
        {driverPath.length > 1 && (
          <Polyline
            positions={driverPath}
            color="#ef4444"
            weight={3}
          />
        )}
        
        <MapUpdater 
          center={center} 
          zoom={14} 
          driverLocation={driverLocation} 
        />
      </MapContainer>
    </div>
  );
};

export default Map;