import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonData() {
  const [data, setData] = useState(null);
  const [resource, setResource] = useState('pokemon'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/${resource}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [resource]);

  return (
    <div>
      <div>
        <button onClick={() => setResource('pokemon')}>Pokémon</button>
        <button onClick={() => setResource('abilities')}>Abilities</button>
        <button onClick={() => setResource('moves')}>Moves</button>
        <button onClick={() => setResource('types')}>Types</button>
      </div>
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PokemonData;
