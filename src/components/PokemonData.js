import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonData() {
  const [data, setData] = useState(null);
  const maxPokemons = 30; // Nombre maximum de Pokémon à afficher

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pokemon');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && (
        <ul>
          {data.slice(0, maxPokemons).map((pokemon) => (
            <li key={pokemon._id}>
              <h3>{pokemon.Name}</h3>
              <ul>
                <li>Type(s): {pokemon.Types.join(', ')}</li>
                <li>Abilities: {pokemon.Abilities.join(', ')}</li>
                <li>Tier: {pokemon.Tier}</li>
                <li>HP: {pokemon.HP}</li>
                <li>Attack: {pokemon.Attack}</li>
                <li>Defense: {pokemon.Defense}</li>
                <li>Special Attack: {pokemon["Special Attack"]}</li>
                <li>Special Defense: {pokemon["Special Defense"]}</li>
                <li>Speed: {pokemon.Speed}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PokemonData;
