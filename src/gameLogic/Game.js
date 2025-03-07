import generateCards from "./generateCards.js";
export default class Game {
  constructor() {
    this.cards = generateCards(12);
    this.score = 0;
    this.isGameOver = false;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  gameOver() {
    this.isGameOver = true;
  }

  playerClickACard(index) {
    if (this.cards[index].isClicked) {
      this.gameOver();
    } else {
      this.cards[index].click();
      this.score++;
    }
  }
}
