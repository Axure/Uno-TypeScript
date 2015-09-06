/**
 * The entrance of the backend game?
 */
import {Player} from "./Player";
import {Heap} from "./Heap";
import {Card} from "./Card";
import {Action} from "./Action";

/**
 * Rules are inherent in this class? Or should we make it separate?
 */

// TODO: do something else in the getter/setter

interface Game {
    //playerNumber: number;
    start();
    nextPlayer();
    endGame();

    ifEnd: boolean;
}

class UnoGame implements Game {

    private _currentDirection;
    private _currentPlayerNumber: number;
    private _totalPlayerNumber: number;
    private _ifEnd;

    private _players: Array<Player>;
    private _heap: Heap;

    constructor(totalPlayerNumber: number) {

        this._currentDirection = 1;

        this._totalPlayerNumber = totalPlayerNumber;

    }

    changeDirection() {
        this._currentDirection *= -1;
    }

    get currentDirection(): number {
        return this._currentDirection;
    }

    /**
     * Add a player.
     * @param playerToAdd
     */
    addPlayer(playerToAdd: Player) {
        /**
         * Will not be able to proceed when the actual player number exceeds the total player number limit.
         */
        if (this.actualPlayerNumber >= this.totalPlayerNumber) {
            throw "Player number limit exceeded!";
        } else {
            this._players.push(playerToAdd);
        }
    }

    get actualPlayerNumber(): number {
        return this._players.length;
    }

    /**
     * Start the game
     */
    start() {
        /**
         * Only able to start when the actual player number is exactly as desired.
         */
        if (this.totalPlayerNumber != this.actualPlayerNumber) {
            throw "Player number mismatch!";
        }

        /**
         * Run the game.
         */
        this._ifEnd = false;
        while (this.ifEnd) {
            /**
             * Proceed to the next player.
             * The cards exchange happens during this session.
             * The effects applied to the next next player also happens.
             * Checks if the game ends.
             */
            this.nextPlayer();
        }

    }

    endGame() {
        this._ifEnd = true;
    }

    get ifEnd(): boolean {
        return this._ifEnd;
    }

    get totalPlayerNumber(): number {
        return this._totalPlayerNumber;
    }

    /**
     * The process of jumping into the next player.
     */
    nextPlayer() {
        /**
         * Move according to the current direction.
         * (Clockwise or counter-clockwise.)
         */
        this._currentPlayerNumber += this._currentDirection;

        /**
         * If the bound is exceeded.
         */
        if (this._currentDirection == 1) {
            if (this._currentPlayerNumber > this._totalPlayerNumber) {
                this._currentPlayerNumber -= this._totalPlayerNumber;
            }
        } else {
            if (this._currentPlayerNumber < 0) {
                this._currentPlayerNumber += this._totalPlayerNumber;
            }
        }

        /**
         * Get the cards
         */
        for (var i = 0; i < this.currentPlayer.nextRoundCardNumber; ++i) {
            this.currentPlayer.letIn(this._heap.nextCard);
            this._heap.nextCard;
        }

        /**
         * Wait and execute the player's action.
         */
        this.waitForAction(this.currentPlayer.currentAction);

        /**
         * Check if the player wins
         */
        if (this.currentPlayer.ifWin) {
            this.endGame();
        } else {

            /**
             * Reset the next round card number.
             */
            this.currentPlayer.resetNextRoundCardNumber();
        }

    }

    /**
     * Get the current player.
     * @returns {Player}
     */
    get currentPlayer(): Player {
        return this._players[this._currentPlayerNumber];
    }

    waitForAction(action: Action) {

    }

}