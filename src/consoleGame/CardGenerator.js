import Card from "./Card.js";
import words from "./data.js";

function shuffle(words) {
  for (let i = words.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  return words;
}

const shuffledWords = shuffle(words);

export default class CardGenerator {
  constructor() {
    this.lastMaxId = 0;
  }

  generateNewCard(count) {
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        new Card(i + this.lastMaxId, shuffledWords[i + this.lastMaxId]),
      );
    }
    this.lastMaxId += count;
    return cards;
  }
}
