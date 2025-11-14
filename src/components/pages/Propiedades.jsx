import SearchBar from "../nabvars/SearchBar";
import PropertyCard from "../PropertyCard";
import { PropertyService } from "../service/PropertyService";
import React, { useEffect, useState } from "react";

export default function Propiedades() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProperties = async () => {
        try {
            setLoading(true);
            const res = await PropertyService.getAll();
            setProperties(res.data);
        } catch (err) {
            console.error("Error al obtener propiedades", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        try {
            setLoading(true);
            const res = await PropertyService.searchTitleOrDescription(query);
            setProperties(res.data);
        } catch (err) {
            console.error("Error en la búsqueda", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProperties();
    }, []);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                <SearchBar handleSearch={handleSearch} />

                {/* --- ESTADO: Cargando --- */}
                {loading && (
                    <p className="text-center text-gray-500 text-lg py-10">
                        Cargando...
                    </p>
                )}

                {/* --- ESTADO: Sin resultados --- */}
                {!loading && properties.length === 0 && (
                    <p className="text-center text-gray-500 text-lg py-10">
                        No hay propiedades para mostrar.
                    </p>
                )}

                {/* --- ESTADO: Hay resultados --- */}
                {!loading && properties.length > 0 && (
                    <div>
                        <h2 className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {properties.map((product) => (
                                <PropertyCard
                                    key={product.id}
                                    property={product}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
