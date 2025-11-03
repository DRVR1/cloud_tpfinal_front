import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Esto es opcional: Fix del ícono por defecto en Leaflet + React
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function () {
    return (
        <MapContainer
            center={[-34.6037, -58.3816]} // Coordenadas: Buenos Aires
            zoom={13}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-34.6037, -58.3816]}>
                <Popup>
                    ¡Hola! Este es un marcador en Buenos Aires.
                </Popup>
            </Marker>
            <Marker position={[-35.6037, -58.3816]}>
                <Popup>
                    ¡Hola! Este es un marcador en Buenos Aires.
                </Popup>
            </Marker>
        </MapContainer>
    );
}
