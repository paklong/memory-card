import { afterEach, describe, it, expect, beforeEach, vi } from "vitest";
import Game from "./Game.js";
import CardGenerator from "./CardGenerator.js";

describe("Game class", () => {
  let game;
  const mockPrompt = vi.fn();
  const mockConsoleLog = vi.spyOn(console, "log");
  const mockConsoleClear = vi.spyOn(console, "clear");

  beforeEach(() => {
    game = new Game(12); // Default card count
    vi.stubGlobal("prompt", mockPrompt);
    mockPrompt.mockClear();
    mockConsoleLog.mockClear();
    mockConsoleClear.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with cardCount and correct defaults", () => {
      expect(game.cardGenerator).toBeInstanceOf(CardGenerator);
      expect(game.cardCount).toBe(12);
      expect(game.score).toBe(0);
      expect(game.cards).toEqual([]);
    });
  });

  describe("startGame", () => {
    it("should reset score and generate initial cards based on cardCount", () => {
      game.score = 5;
      mockPrompt.mockReturnValue("0"); // To exit the loop after one round
      game.startGame();
      expect(game.score).toBe(1); // One successful pick
      expect(game.cards.length).toBe(12);
      expect(game.cards[0]).toHaveProperty("id");
      expect(game.cards[0]).toHaveProperty("name");
    });
  });

  describe("nextRound", () => {
    it("should increase score and return true when picking unpicked card", () => {
      game.startGame = () => {
        // Mock startGame to avoid loop
        game.cards = game.cardGenerator.generateNewCard(12);
      };
      game.startGame();
      mockPrompt.mockReturnValue("0");
      const result = game.nextRound();
      expect(mockConsoleClear).toHaveBeenCalled();
      expect(mockConsoleLog).toHaveBeenCalledWith(`Score :${game.score}`);
      expect(result).toBe(true);
      expect(game.score).toBe(1);
      expect(game.cards[0].isPicked).toBe(true);
    });

    it("should end game and return false when picking already picked card", () => {
      game.startGame = () => {
        // Mock startGame to avoid loop
        game.cards = game.cardGenerator.generateNewCard(12);
      };
      game.startGame();
      game.cards[0].markIsPicked();
      mockPrompt.mockReturnValue("0");
      const result = game.nextRound();
      expect(result).toBe(false);
      expect(game.score).toBe(0);
      expect(mockConsoleLog).toHaveBeenCalledWith("You Lose. Score: 0");
    });
  });

  describe("shuffle", () => {
    it("should change the order of cards", () => {
      game.cards = game.cardGenerator.generateNewCard(12);
      const originalOrder = [...game.cards];
      game.shuffle();
      expect(game.cards).not.toEqual(originalOrder);
    });
  });

  describe("showCards", () => {
    it("should return the current cards array", () => {
      game.cards = game.cardGenerator.generateNewCard(12);
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
      game.cards = game.cardGenerator.generateNewCard(12);
      expect(game.getTotalPicked()).toBe(0);
      game.cards[0].markIsPicked();
      game.cards[1].markIsPicked();
      expect(game.getTotalPicked()).toBe(2);
    });
  });

  describe("shouldAddMoreCard", () => {
    it("should return false when picked cards are below 75% of total", () => {
      game.cards = game.cardGenerator.generateNewCard(12);
      for (let i = 0; i < 8; i++) {
        // 12 * 0.75 = 9, so 8 is below
        game.cards[i].markIsPicked();
      }
      expect(game.shouldAddMoreCard()).toBe(false);
    });

    it("should return true when picked cards exceed 75% of total", () => {
      game.cards = game.cardGenerator.generateNewCard(12);
      for (let i = 0; i < 10; i++) {
        // 10 is above 9
        game.cards[i].markIsPicked();
      }
      expect(game.shouldAddMoreCard()).toBe(true);
    });
  });

  describe("addMoreCard", () => {
    it("should add cardCount more cards", () => {
      game.cards = game.cardGenerator.generateNewCard(12);
      const initialLength = game.cards.length;
      game.addMoreCard();
      expect(game.cards.length).toBe(initialLength + 12);
    });
  });

  describe("userPickCard", () => {
    it("should call markIsPicked on specified card with parsed integer", () => {
      game.cards = game.cardGenerator.generateNewCard(12);
      const result = game.userPickCard("0"); // String input gets parsed
      expect(result).toBe("success");
      expect(game.cards[0].isPicked).toBe(true);
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
      game.cards = game.cardGenerator.generateNewCard(12);
      game.cards[0].markIsPicked();
      const expected = `Socre: 0, Total Cards: 12, Total Picked Cards: 1`;
      expect(game.getGameState()).toBe(expected);
    });
  });
});
