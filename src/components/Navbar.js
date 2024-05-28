import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/pokemon-list">Liste des Pokémon</Link>
        </li>
        <li>
          <Link to="/combat">Combat</Link>
        </li>
        <li>
          <Link to="/quiz">Quiz</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
