import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import Combat from './pages/Combat';
import Quiz from './pages/quiz';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  // Fonction pour récupérer les données des Pokémon depuis le backend
  const fetchPokemon = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/pokemon');
      const data = await response.json();
      setPokemonList(data);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  // Utilise useEffect pour charger la liste des Pokémon au chargement de l'application
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <Router>
      <div>
        <Navbar 
          links={[
            { to: "/", label: "Accueil" },
            { to: "/pokemon-list", label: "Liste des Pokémon" },
            { to: "/combat", label: "Combat" },
            { to: "/quiz", label: "Quiz" }
          ]}
        />

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* Passe la liste des Pokémon en tant que prop au composant PokemonList */}
          <Route path="/pokemon-list" element={<PokemonList pokemonList={pokemonList} />} />
          <Route path="/combat" element={<Combat />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
