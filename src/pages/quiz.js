import React, { useState } from 'react';
import '../css/quiz.css';

const questions = [
    {
        id: 1,
        question: "Quel est ce Pokémon ?",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        options: ["Pikachu", "Bulbizarre", "Salamèche", "Carapuce", "Magicarpe"],
        answer: "Pikachu"
      },
      {
        id: 2,
        question: "Quelle est l'attaque de Salamèche ?",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        options: ["Flammèche", "Éclair", "Charge", "Pistolet à O", "Morsure"],
        answer: "Flammèche"
      },
      {
        id: 3,
        question: "Quel Pokémon évolue en Raichu ?",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
        options: ["Pikachu", "Rattata", "Nidoran", "Pidgeotto", "Spearow"],
        answer: "Pikachu"
      },
      {
        id: 4,
        question: "Quelle est l'attaque de Bulbizarre ?",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        options: ["Tranch'Herbe", "Vive-Attaque", "Charge", "Bec Vrille", "Fouet Lianes"],
        answer: "Tranch'Herbe"
      },
      {
        id: 5,
        question: "Quel Pokémon est de type Eau ?",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
        options: ["Carapuce", "Charmander", "Bulbizarre", "Pikachu", "Rattata"],
        answer: "Carapuce"
      },
      {
        id: 6,
        question: "Quelle est l'attaque de Magicarpe ?",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png",
        options: ["Éclate-Roc", "Ténèbres", "Ampleur", "Demi-Tour", "Trempette"],
        answer: "Trempette"
      },
      {
        id: 7,
        question: "Quel Pokémon est connu pour son attaque 'Hydrocanon' ?",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
        options: ["Tortank", "Blastoise", "Carabaffe", "Kabuto", "Psykokwak"],
        answer: "Blastoise"
      },
      {
        id: 8,
        question: "Quel Pokémon est souvent accompagné de son dresseur, Jessie et James ?",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
        options: ["Rattatac", "Miaouss", "Arbok", "Abo", "Chetiflor"],
        answer: "Miaouss"
      },
      {
        id: 9,
        question: "Quel Pokémon est connu pour son cri 'Pika Pika' ?",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        options: ["Pikachu", "Pichu", "Raichu", "Élektek", "Magnéti"],
        answer: "Pikachu"
      },
      {
        id: 10,
        question: "Quel Pokémon est aussi appelé 'le Pokémon Plante' ?",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
        options: ["Florizarre", "Rafflesia", "Venusaur", "Herbizarre", "Ratata"],
        answer: "Florizarre"
      },
 
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [pokemonImage, setPokemonImage] = useState(questions[0].image);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setPokemonImage(questions[nextQuestion].image);
    } else {
      alert(`Merci d'avoir participé au quiz! Vous avez ${score} bonnes réponses sur ${questions.length}.`);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <img
          src={pokemonImage}
          alt="Pokemon"
          className="quiz-image"
        />
        <h2 className="quiz-question">{questions[currentQuestion].question}</h2>
        <div className="quiz-options">
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerClick(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
