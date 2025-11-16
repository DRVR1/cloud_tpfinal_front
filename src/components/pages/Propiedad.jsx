// Propiedad.jsx (o PropertyDetail.jsx)

import { PropertyService } from "../service/PropertyService";
import React, { useEffect, useState } from "react";
// Importar 'useParams' para obtener el ID de la URL
import { useParams } from 'react-router-dom';

// El nombre de la función debe coincidir con el componente en App.jsx,
// pero aquí lo mantengo como PropertyDetail para la consistencia del código.
export default function Propiedad() { // Cambiado el nombre para coincidir con App.jsx

    // 1. OBTENER EL ID DE LA URL
    const { id } = useParams(); // Lee el parámetro 'id' de la ruta /propiedad/:id

    const [chatResponse, setChatResponse] = useState("Cargando...");
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // Asegúrate de que el ID exista antes de hacer la llamada
        if (!id) {
            console.error("ID de propiedad no encontrado en la URL.");
            setError("ID no válido.");
            setLoading(false);
            return;
        }

        // 2. USAR EL ID OBTENIDO PARA LA LLAMADA AL SERVICIO
        // Convertimos el ID a número si es necesario, aunque PropertyService.getById
        // probablemente lo maneje.
        const propertyId = Number(id);
        console.log(`Cargando propiedad con ID: ${propertyId}`);

        PropertyService.getById(propertyId)
            .then((res) => {
                setProperty(res.data);
                setLoading(false);

                var prompt =
                    "Actúa como un redactor inmobiliario experto. " +
                    "Genera una descripción de propiedad atractiva y vendedora, lista para publicarse. " +
                    "La respuesta debe ser ÚNICAMENTE el texto de la descripción. " +
                    "No incluyas saludos, despedidas, títulos, campos para completar ni ningún texto adicional. " +
                    "Usa un tono cálido y profesional. " +
                    "Datos de la propiedad: \n" +
                    "- Tipo: " + res.data.title + "\n" +
                    "- Dirección: " + res.data.address + "\n" +
                    "- Habitaciones: " + res.data.bedrooms + "\n" +
                    "- Baños: " + res.data.bathrooms + "\n" +
                    "- Metros cuadrados: " + res.data.surface;


                PropertyService.askAI(prompt)
                    .then(function (response) {
                        setChatResponse(response.data);
                        console.log("Response was: " + response.data);
                    })
            })
            .catch((err) => {
                console.error("Error al obtener propiedad", err);
                setError(err);
                setLoading(false);
            });

        // Se agrega 'id' al array de dependencias para que el efecto se re-ejecute
        // si el ID de la URL cambia (aunque en este caso es un componente de detalle)
    }, [id]);

    // --- El resto del componente permanece igual ---

    // --- Estado de Carga ---
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl text-gray-600">Cargando propiedad...</p>
            </div>
        );
    }

    // --- Estado de Error ---
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-red-50">
                <p className="text-xl font-semibold text-red-700">Error: No se pudo cargar la propiedad.</p>
                {/* Mostrar un mensaje si el error es por un ID no válido */}
                {id && <p className="text-lg text-red-500 mt-2">ID solicitado: {id}</p>}
            </div>
        );
    }

    // --- Si no hay propiedad (después de cargar) ---
    if (!property) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white">
                <p className="text-xl font-semibold text-gray-700">Propiedad no encontrada.</p>
            </div>
        );
    }


    // --- Renderizado Principal de la Propiedad ---
    return (
        <div className="bg-white">
            <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                {/* ... el resto del JSX que usa 'property' ... */}

                {/* Contenedor principal de dos columnas */}
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">

                    {/* Columna 1: Imagen Principal */}
                    <div className="sticky top-8">
                        <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="w-full h-auto object-cover object-center rounded-2xl shadow-xl aspect-[4/3]"
                        />
                    </div>

                    {/* Columna 2: Información y Detalles */}
                    <div className="mt-10 px-4 sm:px-0 lg:mt-0">

                        {/* Título */}
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-2">
                            {property.title}
                        </h1>

                        {/* Precio */}
                        <div className="mt-4">
                            <p className="text-4xl font-semibold text-gray-900">
                                ${property.price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}
                            </p>
                        </div>

                        {/* Características (Habitaciones, Baños, Superficie) */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Características Principales</h3>
                            <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">

                                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                                    <dt className="text-sm font-medium text-gray-500">Habitaciones</dt>
                                    <dd className="text-xl font-semibold text-gray-900">{property.bedrooms}</dd>
                                </div>

                                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                                    <dt className="text-sm font-medium text-gray-500">Baños</dt>
                                    <dd className="text-xl font-semibold text-gray-900">{property.bathrooms}</dd>
                                </div>

                                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                                    <dt className="text-sm font-medium text-gray-500">Superficie</dt>
                                    <dd className="text-xl font-semibold text-gray-900">{property.surface} m²</dd>
                                </div>

                            </dl>
                        </div>

                        {/* Descripción */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Descripción</h3>
                            <div className="mt-4 text-base text-gray-700 whitespace-pre-wrap space-y-4">
                                {/* 'whitespace-pre-wrap' respeta los saltos de línea del texto */}
                                <p>{property.description}</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Comentario generado por IA:</h3>
                            <div className="mt-4 text-base text-gray-700 whitespace-pre-wrap space-y-4">
                                {/* 'whitespace-pre-wrap' respeta los saltos de línea del texto */}
                                <p>{chatResponse}</p>
                            </div>
                        </div>

                        {/* Botón de Acción (Call to Action) */}
                        <div className="mt-10">
                            <button
                                type="button"
                                className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 ease-in-out"
                            >
                                Contactar al vendedor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}