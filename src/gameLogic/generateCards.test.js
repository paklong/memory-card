import { describe, test, expect } from "vitest";
import Card from "./Card.js";
import generateCards from "./generateCards.js";

describe("generateCards()", () => {
  test("generate 12 cards", () => {
    const cards = generateCards(12);
    expect(cards[0]).toEqual(new Card(1, "card1"));
    expect(cards[cards.length - 1]).toEqual(new Card(12, "card12"));
  });
});
