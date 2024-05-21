import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonData() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pokemon');
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {pokemonData && (
        <div>
          {pokemonData.map(pokemon => (
            <div key={pokemon._id}>
              <h3>{pokemon.Name}</h3>
              <p>Types: {pokemon.Types.map(type => type.name).join(', ')}</p>
              <p>Abilities: {pokemon.Abilities.map(ability => ability.name).join(', ')}</p>
              <p>Moves: {pokemon.Moves.map(move => move.Name).join(', ')}</p>
              <p>HP: {pokemon.HP}</p>
              <p>Attack: {pokemon.Attack}</p>
              <p>Defense: {pokemon.Defense}</p>
              <p>Special Attack: {pokemon['Special Attack']}</p>
              <p>Special Defense: {pokemon['Special Defense']}</p>
              <p>Speed: {pokemon.Speed}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonData;
