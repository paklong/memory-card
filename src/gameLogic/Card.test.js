import { describe, test, expect } from "vitest";
import Card from "./Card.js";

describe("Card", () => {
  test("setup", () => {
    const card = new Card(1, "card");
    expect(card.id).toBe(1);
    expect(card.name).toBe("card");
    expect(card.isClicked).toBe(false);
  });

  test("click method", () => {
    const card = new Card(1, "card");
    expect(card.isClicked).toBe(false);
    card.click();
    expect(card.isClicked).toBe(true);
    card.click();
    expect(card.isClicked).toBe(true);
  });

  test("reset method", () => {
    const card = new Card(1, "card");
    card.click();
    card.reset();
    expect(card.isClicked).toBe(false);
  });
});
