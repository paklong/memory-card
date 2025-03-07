import { describe, test, expect } from "vitest";
import Game from "./Game.js";

describe("Game", () => {
  test("setup", () => {
    const game = new Game();
    expect(game.cards.length).toBe(12);
    expect(game.score).toBe(0);
    expect(game.isGameOver).toBe(false);
  });

  test("shuffle method", () => {
    const game = new Game();
    const cardsBeforeShuffle = [...game.cards];
    expect(game.cards).toEqual(cardsBeforeShuffle);
    game.shuffle();
    expect(game.cards).not.toEqual(cardsBeforeShuffle);
  });

  test("gameOver method", () => {
    const game = new Game();
    game.gameOver();
    expect(game.isGameOver).toBe(true);
  });

  test("playerClickACard method", () => {
    const game = new Game();
    game.playerClickACard(0);
    expect(game.isGameOver).toBe(false);
    expect(game.cards[0].isClicked).toBe(true);
    expect(game.cards[1].isClicked).toBe(false);
    expect(game.score).toBe(1);

    game.playerClickACard(1);
    expect(game.cards[0].isClicked).toBe(true);
    expect(game.cards[1].isClicked).toBe(true);
    expect(game.score).toBe(2);

    game.playerClickACard(0);
    expect(game.isGameOver).toBe(true);
    expect(game.cards[0].isClicked).toBe(true);
    expect(game.cards[1].isClicked).toBe(true);
    expect(game.score).toBe(2);
  });
});
