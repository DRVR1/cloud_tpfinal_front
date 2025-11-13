import React from "react";
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property }) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/propiedad/${property.id}`)} className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            {/* Imagen */}
            <div className="relative h-48 w-full">
                <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-md">
                    ${property.price.toLocaleString()}
                </span>
            </div>

            {/* Contenido */}
            <div className="flex-1 p-4 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {property.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {property.description}
                </p>

                {/* Características */}
                <div className="grid grid-cols-3 text-gray-700 text-sm mb-4">
                    <div className="flex items-center gap-1">
                        🛏 {property.bedrooms}
                    </div>
                    <div className="flex items-center gap-1">
                        🛁 {property.bathrooms}
                    </div>
                    <div className="flex items-center gap-1">
                        📐 {property.surface}m²
                    </div>
                </div>

                {/* Ubicación */}
                <div className="text-xs text-gray-500 mt-auto">
                    📍 {property?.address || "Ubicación no disponible"}
                </div>
            </div>
        </div>
    );
};
