import axios from "axios";

const API_URL = "/api/property";

export const PropertyService = {
    // Crear propiedad
    create: (property) => axios.post(API_URL, property),

    // Obtener una propiedad por ID
    getById: (id) => axios.get(`${API_URL}/${id}`),

    // Obtener todas las propiedades
    getAll: () => axios.get(`${API_URL}/all`),

    // Reestablecer DB por defecto
    restore: () => axios.get(`${API_URL}/restore`),

    // Actualizar propiedad
    update: (property) => axios.put(API_URL, property),

    // Eliminar propiedad 
    delete: (id) => axios.delete(`${API_URL}/${id}`),

    searchTitleOrDescription: (query) => axios.get(`${API_URL}/search/${query}`)
};
