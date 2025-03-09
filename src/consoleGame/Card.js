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
      return "fail";
    }
    this.isPicked = true;
    return "success";
  }
  getDetails() {
    return `Card id:${this.id}, name:${this.name}, isPicked:${this.isPicked}`;
  }
}
