# TODO
1. create game logic in console first
2. build UI with static data
3. replace static data with dynamic one

# Design
1. Purposes (Requirements)
* Goal
  * A simple memory game that player play
* Features
  * Player can pick card
  * Scores points for new card
  * Game ends when a card is picked twice
  * Automatic grow card size
  * Shuffle cards every turn
  * Track highest score
2. Flow (Interactions)
  1. Each game start with score = 0 and 12 cards
  2. If 80% of cards are picked:
    Y. Add 12 more cards
  3. Each round shuffle cards in random order
  4. User pick one of them
  :wq
  5. If the card is not picked before:
    Y. Score + 1, End round, back to 2
    N. End game
  6. Show score, highest score, and next game option
3. Data (States)
  * score
  * array of cards
  * card (id, name, isPicked) 
  * highest score
4. Component (SRP/SOC)
  * class Card (id, name, isPicked)
  * class Game (score, array of cards) 
  * class CardGenerator (cardGenerated)
  * class ConsoleGameController (higestScore)
5. Behavior (Actions)
  * Card
    * markIsPicked()
    * checkIsPicked()
    * getDetails()
  * Game
    * startGame()
    * endGame()
    * shuffleCards()
    * pickCard(index)
    * shouldAddMoreCard()
    * addMoreCard()
    * isGameOver()
    * getScore()
    * getGameState()
  * CardGenerator
    * generateCard(count)
  * ConsoleGameController
    * getHighScore()
    * createNewGame()
    * promptUserInput()
    * displayRoundDetails()
