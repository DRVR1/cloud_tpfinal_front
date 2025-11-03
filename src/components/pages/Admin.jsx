import React, { useEffect, useState } from "react";
import { PropertyService } from "../service/PropertyService";
import Button from "../Button";
import SearchBar from "../nabvars/SearchBar";

export default function Admin() {
    const [properties, setProperties] = useState([]);
    const [form, setForm] = useState({
        id: "",
        title: "",
        description: "",
        imageUrl: "",
        price: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    // Cargar propiedades al iniciar
    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = () => {
        PropertyService.getAll()
            .then((res) => setProperties(res.data))
            .catch((err) => console.error("Error al obtener propiedades", err));
    };

    // Manejar cambios de formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Crear o actualizar
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            PropertyService.update(form)
                .then(() => {
                    loadProperties();
                    resetForm();
                })
                .catch((err) => console.error("Error al actualizar", err));
        } else {
            PropertyService.create(form)
                .then(() => {
                    loadProperties();
                    resetForm();
                })
                .catch((err) => console.error("Error al crear", err));
        }
    };

    // Eliminar
    const handleDelete = (property) => {
        if (window.confirm(`¿Eliminar propiedad "${property.title}"?`)) {
            PropertyService.delete(property.id)
                .then(() => loadProperties())
                .catch((err) => console.error("Error al eliminar", err));
        }
    };

    const handleRestore = () => {
        console.log("press");
        if (window.confirm("Se eliminarán las propiedades actuales y se agregaran propiedades de muestra.")) {
            PropertyService.restore()
                .then(() => loadProperties())
                .catch((err) => console.error("Error al reestablecer", err));
        }
    };


    // Cargar datos para edición
    const handleEdit = (property) => {
        setForm(property);
        setIsEditing(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    // Limpiar formulario
    const resetForm = () => {
        setForm({
            id: "",
            title: "",
            description: "",
            imageUrl: "",
            price: "",
        });
        setIsEditing(false);
    };

    const handleSearch = (query) => {
        setProperties([]);
        var list = PropertyService.searchTitleOrDescription(query).then((response) => { setProperties(response.data) });
        console.log(list);
    }

    return (
        <div class="MainContainer" style={{ padding: "20px", fontFamily: "Arial" }}>
            <div class="Container">

                <h1>Gestión de Propiedades - Administración</h1>

                <SearchBar handleSearch={handleSearch}></SearchBar>
                <Button title={"Agregar datos de muestra"} onClick={handleRestore}></Button>

                {/* Formulario */}
                <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        style={{ resize: "vertical", width: "100%" }} // Permite al usuario expandir manualmente
                        required
                    />
                    <br />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="URL de imagen"
                        value={form.imageUrl}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <Button title={"Crear"} type="submit" >{isEditing ? "Actualizar" : "Crear"}</Button>
                    {isEditing && <Button title={"Cancelar"} onClick={resetForm} className={"delete-btn"}></Button>}
                </form>

                {/* Lista */}
                <div className="properties-grid">
                    {properties.map((prop) => (
                        <div key={prop.id} className="property-card">
                            {prop.imageUrl && (
                                <img
                                    src={prop.imageUrl}
                                    alt={prop.title}
                                    className="property-image"
                                />
                            )}
                            <div className="property-info">
                                <h2>{prop.title}</h2>
                                <p>{prop.description}</p>
                                <p className="price">USD ${prop.price}</p>
                                <div className="actions">
                                    <Button title="Editar" onClick={() => handleEdit(prop)}></Button>
                                    <Button title="Eliminar" onClick={() => handleDelete(prop)} className="delete-btn">
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


        </div >
    );
}
