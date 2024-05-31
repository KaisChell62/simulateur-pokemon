import React, { useState, useEffect } from 'react';
import '../css/Home.css';

function Home() {
  // État pour stocker les dernières nouvelles Pokémon
  const [latestNews, setLatestNews] = useState([
    {
      date: "10 avril 2024",
      news: [
        "Des astuces pour les Combats de Raids de Pokémon GO contre Méga‑Scarhino ont été partagées.",
      ]
    },
    {
      date: "9 avril 2024",
      news: [
        "Des conseils pour profiter au maximum de l’Aventure entre copains dans Pokémon GO ont été publiés.",
        "Les gagnants des Championnats Internationaux Pokémon d’Europe 2024 ont été annoncés.",
        "L’heure en vedette avec Glibunkel a eu lieu dans Pokémon GO."
      ]
    },
    {
      date: "4 avril 2024",
      news: [
        "Les illustrations de l’extension Écarlate et Violet – Forces Temporelles du Jeu de Cartes à Collectionner Pokémon ont été dévoilées.",
        "Un évènement Surprises de taille de Pokémon GO a été annoncé, mettant à l’honneur des Pokémon XXS et XXL. Les versions chromatiques de Bamboiselle et de Katagami ont fait leurs débuts dans les Raids.",
        "Méga-Dracaufeu X a fait son apparition dans les Méga-Raids de Pokémon GO."
      ]
    },
    {
      date: "3 avril 2024",
      news: [
        "Des astuces pour attraper des Pokémon chromatiques dans les jeux Pokémon Écarlate et Pokémon Violet ont été partagées.",
        "L’évènement Les classiques de la Journée Communauté d’avril 2024 de Pokémon GO a été annoncé, mettant en vedette Draby.",
        "Les meilleures cartes compétitives de l’extension Écarlate et Violet – Forces Temporelles du JCC Pokémon ont été présentées."
      ]
    },
    {
      date: "1 avril 2024",
      news: [
        "Des astuces pour se qualifier aux championnats mondiaux de Pokémon Sleep ont été partagées.",
        "Un événement spécial du 1er avril 2024 nommé « Une Excellente Opportunité » a eu lieu dans Pokémon GO, permettant aux dresseurs d’affiner leurs compétences en matière de lancers et de gagner des récompenses spéciales."
      ]
    }

  ]);

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(response => response.json())
      .then(data => {
        const pokemonInfo = data.results.map(pokemon => {
          return {
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`
          };
        });
        setPokemonData(pokemonInfo);
      })
      .catch(error => console.error('Erreur lors de la récupération des données de la galerie de Pokémon :', error));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newsCards = document.querySelectorAll('.news-card');
    const cardWidth = newsCards[0].offsetWidth;
    const maxIndex = newsCards.length - 1;
    const newIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    document.querySelector('.news-card-container').style.transform = `translateX(-${newIndex * cardWidth}px)`;
  };

  const prevSlide = () => {
    const newsCards = document.querySelectorAll('.news-card');
    const cardWidth = newsCards[0].offsetWidth;
    const maxIndex = newsCards.length - 1;
    const newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
    document.querySelector('.news-card-container').style.transform = `translateX(-${newIndex * cardWidth}px)`;
  };

  return (
    <div className="home-container">
      <section className="news-section">
        <h2>Dernières Nouvelles Pokémon</h2>
        <div className="news-carousel">
          <div className="news-card-container">
            {latestNews.map((item, index) => (
              <div key={index} className="news-card">
                <h3>{item.date}</h3>
                <ul>
                  {item.news.map((newsItem, index) => (
                    <li key={index}>{newsItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="next" onClick={nextSlide}>&#9658;</div>
        <div className="prev" onClick={prevSlide}>&#9668;</div>
      </section>

      <section className="gallery-section">
  <h2>Galerie de Pokémon</h2>
  <div className="pokemon-gallery">
    {pokemonData.map((pokemon, index) => (
      <div key={index} className="home-pokemon-card"> {/* Ici, j'ai changé la classe */}
        <img src={pokemon.image} alt={pokemon.name} />
        <p>{pokemon.name}</p>
      </div>
    ))}
  </div>
</section>

      <section className="guides-section">
        <h2>Guides et Tutoriels</h2>
        <ol>
          <li>
            <h3>Comprendre le jeu de cartes Pokémon :</h3>
            <p>
              Pokémon est un jeu de cartes pour deux joueurs de 8 ans et plus et dure généralement de 20 à 40 minutes.
              Vous avez besoin de 60 cartes par participant et de pions pour indiquer les dégâts et certains effets.
              La première étape est la construction de votre équipe, qui peut être technique mais pas si compliquée si vous suivez quelques conseils.
              Pour construire un deck, vous avez besoin de cartes Pokémon, de cartes énergies et de cartes dresseurs (supporters/objets/stades).
              Pour débuter, répartissez vos cartes comme ceci : 20 cartes Pokémon, 20 cartes énergies, 20 cartes dresseurs.
            </p>
          </li>
          <li>
            <h3>Astuces pour Pokémon GO :</h3>
            <p>
              Vous trouverez ici tous les guides de Pokémon GO réunis en un seul portail.
              Pokédex complet, combats de raids, Team Rocket, légendaires, shiny, météo et autres événements sont tous réunis ici.
              Des astuces concernant la capture ou l’obtention de cadeaux gratuits sont également à votre disposition.
            </p>
          </li>
          <li>
            <h3>Astuces générales pour Pokémon :</h3>
            <p>
              Utilisez vos incubateurs sagement : Conservez votre incubateur de base pour les œufs communs, et utilisez les autres, ceux avec un nombre d’usages limité, pour les plus rares, ceux nécessitant de marcher 7 ou 10 kilomètres.
              N’hésitez pas à échanger vos Pokémon contre des bonbons : A chaque fois que vous transférez un Pokémon au Professeur Willow, vous gagnez un Bonbon permettant de faire évoluer un autre Pokémon.
              Ne gâchez pas vos Oeufs Chance n’importe comment : Utilisez un Oeuf Chance dans Pokémon Go double l’XP que vous gagnez pendant 30 minutes. Gardez-les pour les moments où vous êtes certain que vous allez y jouer pendant des 30 minutes.
              Gardez toujours en tête les faiblesses de vos Pokémon : Comme dans tout jeu de la série, les créatures de Pokémon Go ont un type bien spécifique, et cela signifie qu’elles seront fortes face à certaines attaques et particulièrement vulnérables à d’autres.
            </p>
          </li>
        </ol>
      </section>

      <section className="useful-links-section">
        <h2>Liens Utiles</h2>
        <ul>
          <li>
            <a href="https://pokeweb.fr/">Pokéweb</a> : C’est une plateforme de référence pour les créateurs de contenu liés à Pokémon. Vous y trouverez des liens utiles, des ressources et des dossiers pour devenir le meilleur dresseur et le meilleur créateur possible.
          </li>
          <li>
            <a href="https://coupcritique.fr/resources">Coupcritique</a> : Sur ce site, vous trouverez de nombreuses ressources sur la stratégie Pokémon comme les Viability ranking, les Speed tier ou encore les Rôle compendium.
          </li>
          <li>
            <a href="https://pokegourou.com/conseils-pour-collectionner/5-sites-incontournables-pour-les-passionnes-de-cartes-pokemon/">Pokegourou</a> : Ce guide vous présente 5 sites indispensables pour tous les collectionneurs de cartes Pokémon.
          </li>
          <li>
            <a href="https://www.supersoluce.com/guide-tuto/pokemon-go/pokemon-go-les-sites-utiles">Supersoluce</a> : Ce site propose des guides et des tutoriels pour Pokémon GO, y compris une carte virtuelle géolocalisant en temps réel tous les Pokémons.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
