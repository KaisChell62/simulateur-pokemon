import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/PokemonList.css';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=500')
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la liste de Pokémon :', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <Pokemon key={index} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
}

function Pokemon({ name }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        setPokemonData(response.data);
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération des données de ${name} :`, error);
      });
  }, [name]);

  if (!pokemonData) {
    return <div className="pokemon-card">Chargement...</div>;
  }

  const { sprites, stats } = pokemonData;

  return (
    <div className="pokemon-card">
      <h2 className="pokemon-name">{name}</h2>
      <img src={sprites.front_default} alt={name} className="pokemon-image" />
      <div className="pokemon-stats">
        {stats.map((stat, index) => (
          <span key={index} className={`stat ${stat.stat.name}`}>
            {stat.stat.name}: {stat.base_stat}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
