import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/PokemonList.css';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pokemon');
        setPokemonList(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.Name && pokemon.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">Liste des Pokémon</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher un Pokémon..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon, index) => (
          <Pokemon key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

function Pokemon({ pokemon }) {
  return (
    <div className="pokemon-card">
      <h2 className="pokemon-name">{pokemon.Name}</h2>
      <div className="pokemon-stats">
        <p>Type(s): {pokemon.Types.join(', ')}</p>
        <p>HP: {pokemon.HP}</p>
        <p>Attack: {pokemon.Attack}</p>
        <p>Defense: {pokemon.Defense}</p>
        <p>Special Attack: {pokemon["Special Attack"]}</p>
        <p>Special Defense: {pokemon["Special Defense"]}</p>
        <p>Speed: {pokemon.Speed}</p>
      </div>
    </div>
  );
}

export default PokemonList;
