import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import Combat from './pages/Combat';
import Quiz from './pages/quiz';

function App() {
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
          <Route path="/pokemon-list" element={<PokemonList />} />
          <Route path="/combat" element={<Combat />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
