import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import Combat from './pages/Combat';
import Quiz from './pages/quiz';

function App() {
  const [data, setData] = useState({
    pokemon: [],
    abilities: [],
    moves: [],
    types: []
  });

  const backendUrl = 'https://pokemon-back-liart.vercel.app/'; // URL de votre backend déployé sur Vercel

  // Fonction pour récupérer les données depuis le backend pour une ressource donnée
  const fetchData = async (resource) => {
    try {
      const response = await fetch(`${backendUrl}/api/${resource}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${resource}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${resource} data:`, error);
      return [];
    }
  };

  // Fonction pour récupérer les données de toutes les ressources
  const fetchAllData = async () => {
    const pokemonData = await fetchData('pokemon');
    const abilitiesData = await fetchData('abilities');
    const movesData = await fetchData('moves');
    const typesData = await fetchData('types');
    return { pokemon: pokemonData, abilities: abilitiesData, moves: movesData, types: typesData };
  };

  // Utilise useEffect pour charger les données au chargement de l'application
  useEffect(() => {
    const fetchDataAsync = async () => {
      const allData = await fetchAllData();
      setData(allData);
    };
    fetchDataAsync();
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
          <Route path="/pokemon-list" element={<PokemonList data={data} />} />
          <Route path="/combat" element={<Combat />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
