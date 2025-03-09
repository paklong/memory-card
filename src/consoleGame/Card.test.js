import { describe, it, expect, beforeEach } from "vitest";
import Card from "./Card"; // Adjust the import path based on your file structure

describe("Card class", () => {
  let card;

  // Setup before each test
  beforeEach(() => {
    card = new Card(1, "Test Card");
  });

  // Constructor tests
  describe("constructor", () => {
    it("should create a card with given id and name", () => {
      expect(card.id).toBe(1);
      expect(card.name).toBe("Test Card");
    });

    it("should initialize isPicked as false", () => {
      expect(card.isPicked).toBe(false);
    });
  });

  // checkIsPicked method tests
  describe("checkIsPicked", () => {
    it("should return false when card is not picked", () => {
      expect(card.checkIsPicked()).toBe(false);
    });

    it("should return true when card is picked", () => {
      card.markIsPicked();
      expect(card.checkIsPicked()).toBe(true);
    });
  });

  // markIsPicked method tests
  describe("markIsPicked", () => {
    it("should set isPicked to true and return success message when card is not picked", () => {
      const result = card.markIsPicked();
      expect(card.isPicked).toBe(true);
      expect(result).toBe("success");
    });

    it("should return already picked message and not change state when card is already picked", () => {
      card.markIsPicked(); // First pick
      const initialState = card.isPicked;
      const result = card.markIsPicked(); // Second pick attempt

      expect(card.isPicked).toBe(initialState); // State shouldn't change
      expect(result).toBe("fail");
    });
  });

  // getDetails method tests
  describe("getDetails", () => {
    it("should return correct details for unpicked card", () => {
      const expected = "Card id:1, name:Test Card, isPicked:false";
      expect(card.getDetails()).toBe(expected);
    });

    it("should return correct details for picked card", () => {
      card.markIsPicked();
      const expected = "Card id:1, name:Test Card, isPicked:true";
      expect(card.getDetails()).toBe(expected);
    });
  });
});
