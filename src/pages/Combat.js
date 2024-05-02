import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Combat.css';
import arenaImage from '../picture/arene.png';



function Combat() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [pokemonDetails1, setPokemonDetails1] = useState(null);
  const [pokemonDetails2, setPokemonDetails2] = useState(null);
  const [isCombatStarted, setIsCombatStarted] = useState(false);
  const [health1, setHealth1] = useState(100);
  const [health2, setHealth2] = useState(100);
  const [message, setMessage] = useState('');
  const [isShieldActive1, setIsShieldActive1] = useState(false);
  const [isShieldActive2, setIsShieldActive2] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [canUseAction, setCanUseAction] = useState(true);
  

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      setPokemonList(response.data.results);
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste de Pokémon :', error);
    }
  };

  const fetchPokemonDetails = useCallback(async (pokemonName, setPokemonDetails) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setPokemonDetails(response.data);
    } catch (error) {
      console.error(`Erreur lors de la récupération des détails de ${pokemonName} :`, error);
    }
  }, []);

  const handleAttack = useCallback((attacker, defender) => {
    const damage = Math.floor(Math.random() * 20) + 1;
    if (defender === 1) {
      if (!isShieldActive1) {
        setHealth1((prevHealth) => Math.max(prevHealth - damage, 0));
        setMessage(`Le Pokémon ${selectedPokemon1} attaque et inflige ${damage} dégâts au Pokémon ${attacker} !`);
      } else {
        setMessage(`Le bouclier du Pokémon ${selectedPokemon1} protège contre les dégâts de l'attaque de ${attacker} !`);
      }
    } else if (defender === 2) {
      if (!isShieldActive2) {
        setHealth2((prevHealth) => Math.max(prevHealth - damage, 0));
        setMessage(`Le Pokémon ${selectedPokemon2} attaque et inflige ${damage} dégâts au Pokémon ${attacker} !`);
      } else {
        setMessage(`Le bouclier du Pokémon ${selectedPokemon2} protège contre les dégâts de l'attaque de ${attacker} !`);
      }
    }
    setIsShieldActive1(false);
    setIsShieldActive2(false);
    setIsPlayerTurn(false);
    setCanUseAction(false);
  }, [isShieldActive1, isShieldActive2, selectedPokemon1, selectedPokemon2]);

  const handleHeal = useCallback((target) => {
    const healAmount = Math.floor(Math.random() * 20) + 1;
    if (target === 1) {
      setHealth1((prevHealth) => Math.min(prevHealth + healAmount, 100));
      setMessage(`Le Pokémon ${selectedPokemon1} récupère ${healAmount} points de vie !`);
    } else if (target === 2) {
      setHealth2((prevHealth) => Math.min(prevHealth + healAmount, 100));
      setMessage(`Le Pokémon ${selectedPokemon2} récupère ${healAmount} points de vie !`);
    }
    setIsShieldActive1(false);
    setIsShieldActive2(false);
    setIsPlayerTurn(false);
    setCanUseAction(false);
  }, [selectedPokemon1, selectedPokemon2]);

  const handleSpecialAttack = useCallback((attacker, defender) => {
    const damage = Math.floor(Math.random() * 30) + 10;
    if (defender === 1) {
      if (!isShieldActive1) {
        setHealth1((prevHealth) => Math.max(prevHealth - damage, 0));
        setMessage(`Le Pokémon ${selectedPokemon1} utilise son attaque spéciale et inflige ${damage} dégâts au Pokémon ${attacker} !`);
      } else {
        setMessage(`Le bouclier du Pokémon ${selectedPokemon1} protège contre les dégâts de l'attaque spéciale de ${attacker} !`);
      }
    } else if (defender === 2) {
      if (!isShieldActive2) {
        setHealth2((prevHealth) => Math.max(prevHealth - damage, 0));
        setMessage(`Le Pokémon ${selectedPokemon2} utilise son attaque spéciale et inflige ${damage} dégâts au Pokémon ${attacker} !`);
      } else {
        setMessage(`Le bouclier du Pokémon ${selectedPokemon2} protège contre les dégâts de l'attaque spéciale de ${attacker} !`);
      }
    }
    setIsShieldActive1(false);
    setIsShieldActive2(false);
    setIsPlayerTurn(false);
    setCanUseAction(false);
  }, [isShieldActive1, isShieldActive2, selectedPokemon1, selectedPokemon2]);

  const handleShield = useCallback((user) => {
    if (user === 1) {
      setIsShieldActive1(true);
      setMessage(`Le Pokémon ${selectedPokemon1} utilise un bouclier pour se protéger !`);
    } else if (user === 2) {
      setIsShieldActive2(true);
      setMessage(`Le Pokémon ${selectedPokemon2} utilise un bouclier pour se protéger !`);
    }
    setIsPlayerTurn(false);
    setCanUseAction(false);
  }, [selectedPokemon1, selectedPokemon2]);

  const handleActionClick = useCallback((action) => {
    if (canUseAction) {
      switch (action) {
        case 'attack':
          handleAttack(selectedPokemon1, 2);
          break;
        case 'special':
          handleSpecialAttack(selectedPokemon1, 2);
          break;
        case 'heal':
          handleHeal(1);
          break;
        case 'shield':
          handleShield(1);
          break;
        default:
          break;
      }
    }
  }, [canUseAction, handleAttack, handleSpecialAttack, handleHeal, handleShield, selectedPokemon1]);

  useEffect(() => {
    if (selectedPokemon1) {
      fetchPokemonDetails(selectedPokemon1, setPokemonDetails1);
    }
  }, [selectedPokemon1]);
  
  useEffect(() => {
    if (selectedPokemon2) {
      fetchPokemonDetails(selectedPokemon2, setPokemonDetails2);
    }
  }, [selectedPokemon2]);
  
  useEffect(() => {
    let timerId;
    if (!isPlayerTurn && isCombatStarted) {
      timerId = setTimeout(() => {
        const actionIndex = Math.floor(Math.random() * 4);
        switch (actionIndex) {
          case 0:
            handleAttack(selectedPokemon2, 1);
            break;
          case 1:
            handleSpecialAttack(selectedPokemon2, 1);
            break;
          case 2:
            handleHeal(2);
            break;
          case 3:
            if (Math.random() < 0.5) {
              handleShield(2);
            } else {
              handleAttack(selectedPokemon2, 1);
            }
            break;
          default:
            break;
        }
        setIsPlayerTurn(true);
        setCanUseAction(true);
      }, 5000);
    }
  
    return () => clearTimeout(timerId);
  }, [isPlayerTurn, isCombatStarted, handleAttack, handleSpecialAttack, handleHeal, handleShield, selectedPokemon2]);
  
  useEffect(() => {
    if (isCombatStarted) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemon = pokemonList[randomIndex];
      setSelectedPokemon2(randomPokemon.name);
      fetchPokemonDetails(randomPokemon.name, setPokemonDetails2);
    }
  }, [isCombatStarted, pokemonList]);
  
  useEffect(() => {
    if (health1 <= 0) {
      alert('Game Over');
    }
    if (health2 <= 0) {
      alert('Bravo, tu as gagné le combat !');
    }
  }, [health1, health2]);
  
  

  
  return (
    <div className="combat-container">
      {!isCombatStarted && <h2>Combat Pokémon</h2>}
      {isCombatStarted && (
        <img src={arenaImage} alt="Arène" className="arena-image" />
      )}
      {isCombatStarted ? (
        <div className="combat-pokemon">
          <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '10px' }}>
            <div style={{ position: 'absolute', left: '350px' }}>
              <h3>{selectedPokemon1}</h3>
              {pokemonDetails1 && (
                <>
                  <div style={{ position: 'relative' }}>
                    <img src={pokemonDetails1.sprites.front_default} alt={selectedPokemon1} className="pokemon-image" />
                    <div>Vie: {health1}</div>
                  </div>
                </>
              )}
              {isPlayerTurn && canUseAction && (
                <>
                  <button onClick={() => handleActionClick('attack')}>Attaquer</button>
                  <button onClick={() => handleActionClick('special')}>Attaque Spéciale</button>
                  <button onClick={() => handleActionClick('heal')}>Soigner</button>
                  <button onClick={() => handleActionClick('shield')}>Bouclier</button>
                </>
              )}
            </div>
            <div style={{ position: 'absolute', left: '1340px' }}>
              <h3>{selectedPokemon2}</h3>
              {pokemonDetails2 && (
                <>
                  <div style={{ position: 'relative' }}>
                    <img src={pokemonDetails2.sprites.front_default} alt={selectedPokemon2} className="pokemon-image" />
                    <div>Vie: {health2}</div>
                  </div>
                </>
              )}
              {!isPlayerTurn && (
                <p>C'est le tour du robot...</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="selection-container">
          <h3>Sélectionnez le premier Pokémon :</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {pokemonList.map((pokemon, index) => (
              <div key={index} onClick={() => { setSelectedPokemon1(pokemon.name); setIsCombatStarted(true); }}>
                <h4>{pokemon.name}</h4>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} className="pokemon-image" />
              </div>
            ))}
          </div>
        </div>
      )}
      <br />
      <Link to="/" style={{ position: 'absolute', bottom: '-450px', left: '30px', fontFamily: 'Arial Black', color: 'black' }}>Retour à l'accueil</Link>
    </div>
  );
  
  
};
  export default Combat;
  
  