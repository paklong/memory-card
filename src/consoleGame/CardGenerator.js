import Card from "./Card.js";
import words from "./data.js";

export default class CardGenerator {
  constructor() {
    this.lastMaxId = 0;
  }

  generateNewCard(count) {
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(new Card(i + this.lastMaxId, words[i + this.lastMaxId]));
    }
    this.lastMaxId += count;
    return cards;
  }
}
