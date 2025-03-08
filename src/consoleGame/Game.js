import CardGenerator from "./CardGenerator.js";

export default class Game {
  constructor() {
    this.cardGenerator = new CardGenerator();
    this.score = 0;
    this.cards = [];
  }

  startGame() {
    this.score = 0;
    this.cards = this.cardGenerator.generateNewCard(12);
  }

  nextRound() {
    this.shuffle();
    if (this.shouldAddMoreCard) {
      this.addMoreCard();
    }
    this.showCards();
    const userPicked = this.getUserPick();
    const pickResult = this.userPickCard(userPicked);
    if (pickResult === "Card Picked Already") {
      this.score++;
      return true;
    } else {
      this.endGame();
      return false;
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  showCards() {
    console.log(this.cards);
  }

  getUserPick() {
    return prompt("Pick a card number:");
  }

  getTotalPicked() {
    return this.cards.filter((card) => card.isPicked).lenght;
  }

  shouldAddMoreCard() {
    return this.getTotalPicked() > this.cards.length ? true : false;
  }

  addMoreCard() {
    const cardsToAdd = this.cardGenerator.generateNewCard(12);
    this.cards = [...this.cards, ...cardsToAdd];
  }

  userPickCard(index) {
    return this.cards[index].markIsPicked();
  }

  endGame() {
    console.log(`You Lose. Score: ${this.score}`);
    return this.score;
  }

  getScore() {
    return this.score;
  }

  getGameState() {
    return `Socre: ${this.score}, Total Cards: ${this.cards.length}, Total Picked Cards: ${this.getTotalPicked()}`;
  }
}
