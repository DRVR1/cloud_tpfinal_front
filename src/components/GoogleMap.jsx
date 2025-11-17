import React, { useState } from 'react';

function GoogleMap({ address }) {

    // Codifica la dirección para que sea segura en la URL
    const encodedAddress = encodeURIComponent(address);

    // URL del iframe de Google Maps para buscar la ubicación
    const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;

    return (
        <div style={{ padding: '20px' }}>
            {/* Iframe del Mapa */}
            <iframe
                width="100%"
                height="450"
                style={{ border: 0, marginTop: '20px' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapUrl}
                title="Google Map Embed"
            ></iframe>
        </div>
    );
}

export default GoogleMap;