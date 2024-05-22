import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Combat.css';

function Combat() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [combatDemarre, setCombatDemarre] = useState(false);
  const [afficherListePokemon, setAfficherListePokemon] = useState(false);
  const [pointsDeVieJoueur, setPointsDeVieJoueur] = useState(100);
  const [pointsDeVieRobot, setPointsDeVieRobot] = useState(100);
  const [message, setMessage] = useState('');
  const [estAuTourDuJoueur, setEstAuTourDuJoueur] = useState(true);
  const [peutAttaquer, setPeutAttaquer] = useState(true);
  const [attaquesPokemon, setAttaquesPokemon] = useState([]);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/pokemon');
      const donneesPokemon = response.data.map(pokemon => {
        const pokemonNettoye = { ...pokemon };
        if (pokemonNettoye[' Name']) {
          pokemonNettoye['Name'] = pokemonNettoye[' Name'].trim();
        }
        return pokemonNettoye;
      });
      setPokemonList(donneesPokemon.slice(0, 30));
    } catch (error) {
      console.error('Erreur lors de la récupération des données Pokémon:', error);
    }
  };

  const choisirPokemonAleatoire = () => {
    const indexAleatoire = Math.floor(Math.random() * pokemonList.length);
    const pokemonAleatoire = pokemonList[indexAleatoire].Name;
    setSelectedPokemon(pokemonAleatoire);
    setCombatDemarre(true);
    choisirPokemonRobotAleatoire();
  };

  const choisirPokemon = (nomPokemon) => {
    setSelectedPokemon(nomPokemon);
    setCombatDemarre(true);
    setAfficherListePokemon(false);
    choisirPokemonRobotAleatoire();
  };

  const choisirPokemonRobotAleatoire = () => {
    const indexAleatoire = Math.floor(Math.random() * pokemonList.length);
    const pokemonAleatoire = pokemonList[indexAleatoire].Name;
    setMessage(`Le Pokémon ennemi ${pokemonAleatoire} a été choisi !`);
  };

  const attaquer = (attaque) => {
    const degats = Math.floor(Math.random() * 20) + 1;
    setPointsDeVieRobot(prevPV => Math.max(prevPV - degats, 0));
    setMessage(`Vous attaquez avec ${attaque} et infligez ${degats} dégâts au Pokémon ennemi !`);
    setEstAuTourDuJoueur(false);
    setPeutAttaquer(false);
    setTimeout(() => {
      attaquerRobot();
    }, 1000); // Attendre 1 seconde avant que le robot attaque
  };

  const attaquerRobot = () => {
    const indexAleatoire = Math.floor(Math.random() * attaquesPokemon.length);
    const attaqueAleatoire = attaquesPokemon[indexAleatoire].Name;
    const degats = Math.floor(Math.random() * 20) + 1;
    setPointsDeVieJoueur(prevPV => Math.max(prevPV - degats, 0));
    setMessage(`Le Pokémon ennemi attaque avec ${attaqueAleatoire} et vous inflige ${degats} dégâts !`);
    setEstAuTourDuJoueur(true);
    setPeutAttaquer(true);
  };

  const finirTour = () => {
    setEstAuTourDuJoueur(true);
    setPeutAttaquer(true);
    attaquerRobot();
  };

  useEffect(() => {
    const fetchAttaquesPokemon = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/moves');
        setAttaquesPokemon(response.data.slice(0, 4)); // Récupérer seulement les 4 premières attaques
      } catch (error) {
        console.error('Erreur lors de la récupération des attaques Pokémon:', error);
      }
    };

    fetchAttaquesPokemon();
  }, []);

  return (
    <div className="combat-container">
      {!combatDemarre && (
        <div>
          <button className="animate-color" onClick={choisirPokemonAleatoire}>Combat aléatoire</button>
          <button onClick={() => setAfficherListePokemon(true)}>Choisir un Pokémon</button>
        </div>
      )}
      {afficherListePokemon && !combatDemarre && (
        <div className="select-pokemon">
          <h2>Choisir un Pokémon</h2>
          <ul>
            {pokemonList.map(pokemon => (
              <li key={pokemon._id} onClick={() => choisirPokemon(pokemon.Name)}>
                <div className="pokemon-card rotate-effect">
                  <h3>{pokemon.Name}</h3>
                  <div className="pokemon-stats">
                    <div className="stat hp">HP: {pokemon.HP}</div>
                    <div className="stat attack">Attaque: {pokemon.Attack}</div>
                    <div className="stat defense">Défense: {pokemon.Defense}</div>
                    <div className="stat special-attack">Attaque Spéciale: {pokemon['Special Attack']}</div>
                    <div className="stat special-defense">Défense Spéciale: {pokemon['Special Defense']}</div>
                    <div className="stat speed">Vitesse: {pokemon.Speed}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {combatDemarre && (
        <div className="battle-screen">
          <h2>Combat Pokémon</h2>
          <p>Votre Pokémon : {selectedPokemon}</p>
          <div className="health-bar">
            <span style={{ width: `${pointsDeVieJoueur}%` }}></span>
          </div>
          <p>Points de vie du joueur : {pointsDeVieJoueur}</p>
          <div className="health-bar">
            <span style={{ width: `${pointsDeVieRobot}%` }}></span>
          </div>
          <p>Points de vie du robot : {pointsDeVieRobot}</p>
          {attaquesPokemon.map((attaque, index) => (
            <button key={index} disabled={!estAuTourDuJoueur || !peutAttaquer} onClick={() => attaquer(attaque.Name)}>
              {attaque.Name}
            </button>
          ))}
          <button disabled={estAuTourDuJoueur} onClick={finirTour}>Terminer le tour</button>
          <p className="message">{message}</p>
        </div>
      )}
    </div>
  );
}

export default Combat;
