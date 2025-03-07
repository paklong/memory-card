import Card from "./Card.js";

export default function generateCards(numberOfCard) {
  const cards = [];
  for (let i = 0; i < numberOfCard; i++) {
    cards.push(new Card(i + 1, `card${i + 1}`));
  }

  return cards;
}
