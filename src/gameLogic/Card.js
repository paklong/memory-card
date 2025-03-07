export default class Card {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.isClicked = false;
  }

  click() {
    this.isClicked = true;
  }

  reset() {
    this.isClicked = false;
  }
}
