import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/PokemonList.css'; // Assurez-vous que le chemin vers votre fichier CSS est correct

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon`);
        // Supprimer l'espace avant le nom
        const cleanedData = response.data.map(pokemon => {
          const cleanedPokemon = { ...pokemon };
          if (cleanedPokemon[' Name']) {
            cleanedPokemon['Name'] = cleanedPokemon[' Name'].trim();
          }
          return cleanedPokemon;
        });
       
        setPokemonData(cleanedData.slice(0, 30));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Liste des Pokémon</h1>
      <div className="pokemon-grid">
        {pokemonData.map(pokemon => (
          <div key={pokemon._id} className="pokemon-card">
            <h3>{pokemon.Name}</h3>
            <div className="pokemon-stats">
              <div className="stat hp">HP: {pokemon.HP}</div>
              <div className="stat attack">Attack: {pokemon.Attack}</div>
              <div className="stat defense">Defense: {pokemon.Defense}</div>
              <div className="stat special-attack">Special Attack: {pokemon['Special Attack']}</div>
              <div className="stat special-defense">Special Defense: {pokemon['Special Defense']}</div>
              <div className="stat speed">Speed: {pokemon.Speed}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
