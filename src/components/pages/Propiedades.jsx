import SearchBar from "../nabvars/SearchBar";
import PropertyCard from "../PropertyCard";
import { PropertyService } from "../service/PropertyService";
import React, { useEffect, useState } from "react";

export default function Propiedades() {
    // --- ESTADOS ---

    // Estado para la lista *completa* de propiedades (la "master list")
    const [allProperties, setAllProperties] = useState([]);

    // Estado para la lista *filtrada* que se muestra al usuario
    const [filteredProperties, setFilteredProperties] = useState([]);

    // Estado de carga
    const [loading, setLoading] = useState(true);

    // --- ESTADOS DE FILTROS ---
    const [searchQuery, setSearchQuery] = useState("");
    const [minBedrooms, setMinBedrooms] = useState(""); // "" significa "cualquiera"
    const [minBathrooms, setMinBathrooms] = useState(""); // "" significa "cualquiera"
    const [maxPrice, setMaxPrice] = useState("");       // "" significa "cualquiera"


    // --- EFECTO 1: Cargar propiedades iniciales (solo al montar) ---
    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                const res = await PropertyService.getAll();
                setAllProperties(res.data);      // Guarda la lista completa
                setFilteredProperties(res.data); // Guarda la lista a mostrar
            } catch (err) {
                console.error("Error al obtener propiedades", err);
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, []); // El array vacío [] asegura que se ejecute solo una vez


    // --- EFECTO 2: Aplicar filtros cuando cambien los estados de filtro ---
    useEffect(() => {
        // No mostrar "Cargando..." para filtros rápidos, solo si la carga inicial está en curso
        if (loading) return;

        // Empezamos con la lista completa
        let properties = [...allProperties];

        // 1. Filtrar por Búsqueda (título o descripción)
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            properties = properties.filter(prop =>
                prop.title.toLowerCase().includes(lowerQuery) ||
                (prop.description && prop.description.toLowerCase().includes(lowerQuery))
            );
        }

        // 2. Filtrar por Habitaciones (mínimo)
        if (minBedrooms) {
            const beds = parseInt(minBedrooms, 10);
            properties = properties.filter(prop => prop.bedrooms >= beds);
        }

        // 3. Filtrar por Baños (mínimo)
        if (minBathrooms) {
            const baths = parseInt(minBathrooms, 10);
            properties = properties.filter(prop => prop.bathrooms >= baths);
        }

        // 4. Filtrar por Precio (máximo)
        if (maxPrice) {
            const price = parseFloat(maxPrice);
            properties = properties.filter(prop => prop.price <= price);
        }

        // Actualizamos la lista que se muestra al usuario
        setFilteredProperties(properties);

    }, [searchQuery, minBedrooms, minBathrooms, maxPrice, allProperties, loading]);


    // --- MANEJADORES ---

    // Manejador para la barra de búsqueda (ahora solo actualiza el estado)
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Función para limpiar todos los filtros
    const clearFilters = () => {
        setSearchQuery("");
        setMinBedrooms("");
        setMinBathrooms("");
        setMaxPrice("");
        // NOTA: Si SearchBar no se limpia solo, necesitaría recibir
        // 'searchQuery' como prop y un método para limpiarlo.
        // Por ahora, esto resetea el filtro lógico.
    };


    // --- RENDERIZADO ---
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                <SearchBar handleSearch={handleSearch} />

                {/* --- SECCIÓN DE FILTROS --- */}
                <div className="my-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Filtro Habitaciones */}
                    <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                            Habitaciones (mín.)
                        </label>
                        <select
                            id="bedrooms"
                            name="bedrooms"
                            value={minBedrooms}
                            onChange={(e) => setMinBedrooms(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Cualquiera</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                    </div>

                    {/* Filtro Baños */}
                    <div>
                        <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                            Baños (mín.)
                        </label>
                        <select
                            id="bathrooms"
                            name="bathrooms"
                            value={minBathrooms}
                            onChange={(e) => setMinBathrooms(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Cualquiera</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                        </select>
                    </div>

                    {/* Filtro Precio Máximo */}
                    <div>
                        <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">
                            Precio Máximo ($)
                        </label>
                        <input
                            type="number"
                            name="max-price"
                            id="max-price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Ej: 500000"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            step="10000"
                        />
                    </div>

                    {/* Botón para limpiar filtros */}
                    <div>
                        <label className="block text-sm font-medium text-transparent">
                            Limpiar
                        </label>
                        <button
                            onClick={clearFilters}
                            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            Limpiar Filtros
                        </button>
                    </div>

                </div>
                {/* --- FIN SECCIÓN DE FILTROS --- */}


                {/* --- ESTADO: Cargando (Solo para la carga inicial) --- */}
                {loading && (
                    <p className="text-center text-gray-500 text-lg py-10">
                        Cargando...
                    </p>
                )}

                {/* --- ESTADO: Sin resultados (basado en la lista filtrada) --- */}
                {!loading && filteredProperties.length === 0 && (
                    <p className="text-center text-gray-500 text-lg py-10">
                        No hay propiedades que coincidan con los filtros.
                    </p>
                )}

                {/* --- ESTADO: Hay resultados (basado en la lista filtrada) --- */}
                {!loading && filteredProperties.length > 0 && (
                    <div>
                        <h2 className="sr-only">Propiedades</h2>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {/* Mapeamos sobre la lista FILTRADA */}
                            {filteredProperties.map((product) => (
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