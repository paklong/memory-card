// CardGenerator.test.js
import { describe, it, expect, beforeEach } from "vitest";
import CardGenerator from "./CardGenerator.js";
import Card from "./Card.js";
import words from "./data.js";

describe("CardGenerator class", () => {
  let generator;

  beforeEach(() => {
    generator = new CardGenerator();
  });

  describe("constructor", () => {
    it("should initialize lastMaxId to 0", () => {
      expect(generator.lastMaxId).toBe(0);
    });
  });

  describe("generateNewCard", () => {
    it("should generate correct number of cards", () => {
      const count = 3;
      const cards = generator.generateNewCard(count);
      expect(cards.length).toBe(count);
    });

    it("should create cards with sequential IDs starting from 0", () => {
      const cards = generator.generateNewCard(3);
      expect(cards[0].id).toBe(0);
      expect(cards[1].id).toBe(1);
      expect(cards[2].id).toBe(2);
    });

    it("should use correct words from data array", () => {
      const cards = generator.generateNewCard(3);
      expect(cards[0].name).toBe(words[0]); // "bake"
      expect(cards[1].name).toBe(words[1]); // "opinion"
      expect(cards[2].name).toBe(words[2]); // "excavation"
    });

    it("should increment lastMaxId correctly", () => {
      generator.generateNewCard(3);
      expect(generator.lastMaxId).toBe(3);
      generator.generateNewCard(2);
      expect(generator.lastMaxId).toBe(5);
    });

    it("should generate cards with sequential IDs across multiple calls", () => {
      const firstBatch = generator.generateNewCard(2);
      const secondBatch = generator.generateNewCard(2);

      expect(firstBatch[0].id).toBe(0);
      expect(firstBatch[1].id).toBe(1);
      expect(secondBatch[0].id).toBe(2);
      expect(secondBatch[1].id).toBe(3);
    });

    it("should return Card instances", () => {
      const cards = generator.generateNewCard(1);
      expect(cards[0]).toBeInstanceOf(Card);
    });

    it("should generate cards with isPicked set to false", () => {
      const cards = generator.generateNewCard(2);
      expect(cards[0].isPicked).toBe(false);
      expect(cards[1].isPicked).toBe(false);
    });
  });
});
