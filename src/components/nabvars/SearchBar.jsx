import React from 'react';
import './SearchBar.css';
import { useState } from 'react';
import Button from '../Button';
function SearchBar({ handleSearch }) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="searchContainer">
            <div className="searchBox">
                <input id="searchInput" className="searchAppInput" onChange={handleInputChange} placeholder="Ejemplo: departamento" />
            </div>
            <Button id={"searchButton"} title={"Buscar"} onClick={() => { handleSearch(searchTerm) }}></Button>
        </div>
    );
}
export default SearchBar;