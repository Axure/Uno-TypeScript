import {Card} from './Card';
import {Action} from "./Action";

interface IPlayer {
    //cards: Array<Card>; // This is not correct. We should appoint the functions instead of such internal storage fields.

}

export class Player {
    private _cards: Array<Card>;
    private _nextRoundCardNumber: number;
    private _currentAction: Action;

    constructor() {

        this._nextRoundCardNumber = 1;
    }

    /**
     * Give out a card with given number.
     * @param cardNumber
     */
    giveOut(cardNumber: number): Card {
        if ((cardNumber < 0) && (cardNumber > this._cards.length)) {
            throw "Invalid card number.";
        }
        var cardToToGiveOut = this._cards[cardNumber];
        delete this._cards[cardNumber];
        return cardToToGiveOut;
    }

    /**
     * Receive a card.
     * @param card
     */
    letIn(card: Card) {
        this._cards.push(card);
    }

    get ifUno(): boolean {
        return (this._cards.length == 1);
    }

    get ifWin(): boolean {
        return (this._cards.length == 0);
    }

    get remainingCardNumber(): number {
        return this._cards.length;
    }

    get nextRoundCardNumber(): number {
        return this._nextRoundCardNumber;
    }

    resetNextRoundCardNumber() {
        this._nextRoundCardNumber = 1;
    }

    applyCard(cardToApply: Card) {

    }

    /**
     * TODO: maybe we should make the action a queue.
     * @param actionToAdd
     */
    addAction(actionToAdd: Action) {
        if (actionToAdd.owner != this) {
            throw "Action owner mismatch!";
        }
        this._currentAction = actionToAdd;
    }
}
