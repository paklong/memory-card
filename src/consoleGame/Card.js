export default class Card {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.isPicked = false;
  }
  checkIsPicked() {
    return this.isPicked;
  }
  markIsPicked() {
    if (this.checkIsPicked()) {
      return "Card Picked Already";
    }
    this.isPicked = true;
    return "Card Successfully";
  }
  getDetails() {
    return `Card id:${this.id}, name:${this.name}, isPicked:${this.isPicked}`;
  }
}
