import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import data from "./data.jsx";

export default function Game() {
  const [score, setScore] = useState(0);
  const [pickedCards, setPickedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]); // Fixed typo in variable name
  const [numberOfCards, setNumberOfCards] = useState(12);

  function shuffle(cards) {
    const shuffled = [...cards];
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Fixed shuffle logic
    }
    return shuffled;
  }

  useEffect(() => {
    setShuffledCards(shuffle(data));
  }, []);

  function handleCardClicked(id) {
    if (pickedCards.includes(id)) {
      setIsGameOver(true);
      console.log(`This card was picked before, you lose.`);
    } else {
      setPickedCards((prev) => [...prev, id]);
      setScore((prev) => prev + 1);
      if (score >= Math.floor(numberOfCards * 0.8)) {
        setNumberOfCards((prev) => prev + 4);
      }
      console.log(`Good pick. Score: ${score + 1}`);
    }
  }

  const renderedCards = shuffle(shuffledCards.slice(0, numberOfCards));
  const cardsRendered = renderedCards.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        src={card.src}
        onClick={handleCardClicked}
        disable={isGameOver}
      />
    );
  });

  function resetGame() {
    setScore(0);
    setPickedCards([]);
    setIsGameOver(false);
    setNumberOfCards(12);
    setShuffledCards(shuffle(data)); // Reset with shuffled cards
  }

  return (
    <>
      <h1>
        {isGameOver ? `Game Over. Final Score: ${score}` : `Score: ${score}`}
      </h1>
      <h2>{isGameOver && <button onClick={resetGame}>Play Again</button>}</h2>
      {cardsRendered}
    </>
  );
}
