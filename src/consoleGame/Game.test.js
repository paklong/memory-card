import { afterEach, describe, it, expect, beforeEach, vi } from "vitest";
import Game from "./Game.js";
import CardGenerator from "./CardGenerator.js";

describe("Game class", () => {
  let game;

  const mockPrompt = vi.fn();

  beforeEach(() => {
    game = new Game();
    vi.stubGlobal("prompt", mockPrompt);
    mockPrompt.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with correct defaults", () => {
      expect(game.cardGenerator).toBeInstanceOf(CardGenerator);
      expect(game.score).toBe(0);
      expect(game.cards).toEqual([]);
    });
  });

  describe("startGame", () => {
    it("should reset score and generate 12 cards", () => {
      game.score = 5;
      game.startGame();
      expect(game.score).toBe(0);
      expect(game.cards.length).toBe(12);
      expect(game.cards[0]).toHaveProperty("id");
      expect(game.cards[0]).toHaveProperty("name");
    });
  });

  describe("shuffle", () => {
    it("should change the order of cards", () => {
      game.startGame();
      const originalOrder = [...game.cards];
      game.shuffle();
      expect(game.cards).not.toEqual(originalOrder);
    });
  });

  describe("showCards", () => {
    it("should return the current cards array", () => {
      game.startGame();
      expect(game.showCards()).toBe(game.cards);
    });
  });

  describe("getUserPick", () => {
    it("should call prompt and return user input", () => {
      mockPrompt.mockReturnValue("5");
      const result = game.getUserPick();
      expect(mockPrompt).toHaveBeenCalledWith("Pick a card number:");
      expect(result).toBe("5");
    });
  });

  describe("getTotalPicked", () => {
    it("should return correct count of picked cards", () => {
      game.startGame();
      expect(game.getTotalPicked()).toBe(0);
      game.cards[0].markIsPicked();
      game.cards[1].markIsPicked();
      expect(game.getTotalPicked()).toBe(2);
    });
  });

  describe("shouldAddMoreCard", () => {
    it("should return false when picked cards are below 80% of total", () => {
      game.startGame();
      // 12 cards * 0.8 = 9.6, so 9 or fewer should return false
      for (let i = 0; i < 9; i++) {
        game.cards[i].markIsPicked();
      }
      expect(game.shouldAddMoreCard()).toBe(false);
    });

    it("should return true when picked cards exceed 80% of total", () => {
      game.startGame();
      // 12 cards * 0.8 = 9.6, so 10 or more should return true
      for (let i = 0; i < 10; i++) {
        game.cards[i].markIsPicked();
      }
      expect(game.shouldAddMoreCard()).toBe(true);
    });
  });

  describe("addMoreCard", () => {
    it("should add 12 more cards", () => {
      game.startGame();
      const initialLength = game.cards.length;
      game.addMoreCard();
      expect(game.cards.length).toBe(initialLength + 12);
    });
  });

  describe("userPickCard", () => {
    it("should call markIsPicked on specified card", () => {
      game.startGame();
      const result = game.userPickCard(0);
      expect(result).toBe("success");
      expect(game.cards[0].isPicked).toBe(true);
    });
  });

  describe("nextRound", () => {
    it("should increase score and return true when picking unpicked card", () => {
      game.startGame();
      mockPrompt.mockReturnValue("0");
      const result = game.nextRound();
      expect(result).toBe(true);
      expect(game.score).toBe(1);
    });

    it("should end game and return false when picking already picked card", () => {
      game.startGame();
      const pickedCardId = game.cards[0].id; // Store the ID of the card we pick
      game.cards[0].markIsPicked();
      // Find the index of the card with our picked ID after shuffle
      mockPrompt.mockImplementation(() => {
        const currentIndex = game.cards.findIndex(
          (card) => card.id === pickedCardId,
        );
        return currentIndex.toString();
      });
      const result = game.nextRound();
      expect(result).toBe(false);
      expect(game.score).toBe(0);
    });
  });

  describe("endGame", () => {
    it("should return lose message with current score", () => {
      game.score = 3;
      expect(game.endGame()).toBe("You Lose. Score: 3");
    });
  });

  describe("getScore", () => {
    it("should return current score", () => {
      game.score = 5;
      expect(game.getScore()).toBe(5);
    });
  });

  describe("getGameState", () => {
    it("should return formatted game state", () => {
      game.startGame();
      game.cards[0].markIsPicked();
      const expected = `Socre: 0, Total Cards: 12, Total Picked Cards: 1`;
      expect(game.getGameState()).toBe(expected);
    });
  });
});
