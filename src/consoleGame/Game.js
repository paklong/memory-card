import CardGenerator from "./CardGenerator.js";

export default class Game {
  constructor(cardCount) {
    this.cardGenerator = new CardGenerator();
    this.cardCount = cardCount;
    this.score = 0;
    this.cards = [];
    this.growFactor = 0.7;
  }

  startGame() {
    this.score = 0;
    this.cards = this.cardGenerator.generateNewCard(this.cardCount);
    let keepGoing = true;
    while (keepGoing) {
      keepGoing = this.nextRound();
    }
  }

  nextRound() {
    if (this.shouldAddMoreCard()) {
      this.addMoreCard();
    }
    this.shuffle();
    console.clear();
    console.log("\n\n\n\n\n\n\n");
    console.log(`Score :${this.score}`);
    this.showCards().map((card, index) => {
      console.log(`${index}: ${card.name}`);
    });
    const userPicked = this.getUserPick();
    const pickResult = this.userPickCard(parseInt(userPicked));
    if (pickResult === "success") {
      this.score++;
      return true;
    } else {
      console.log(this.endGame());
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
    return this.cards;
  }

  getUserPick() {
    return prompt("Pick a card number:");
  }

  getTotalPicked() {
    return this.cards.filter((card) => card.isPicked).length;
  }

  shouldAddMoreCard() {
    if (
      this.getTotalPicked() >= Math.floor(this.cards.length * this.growFactor)
    ) {
      const max = 1;
      const min = 0.7;
      this.growFactor = Math.random() * (max - min) + min;
      return true;
    }
    return false;
  }

  addMoreCard() {
    const cardsToAdd = this.cardGenerator.generateNewCard(this.cardCount);
    this.cards = [...this.cards, ...cardsToAdd];
  }

  userPickCard(index) {
    return this.cards[index].markIsPicked();
  }

  endGame() {
    return `You Lose. Score: ${this.score}`;
  }

  getScore() {
    return this.score;
  }

  getGameState() {
    return `Socre: ${this.score}, Total Cards: ${this.cards.length}, Total Picked Cards: ${this.getTotalPicked()}`;
  }
}
