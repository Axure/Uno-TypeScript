import {Card} from "./Card";

interface IRule {

}

export class Rule {

    _store: Object;
    _cards: Array<Card>;

    constructor() {

    }

    addRule(card: Card, numberLimit: number) {
        this._store[JSON.stringify(Card)] = numberLimit;
        this._cards.push(card);
    }

    retrieveRuleFor(card: Card): number {
        return this._store[JSON.stringify(Card)];
    }

    /**
     * Iterate through the rules with a function.
     * Used to initialize the game.
     * @param func
     */
    iterateWith(func: (card: Card, numberLimit: number) => any) {
        for (var i = 0; i < this._cards.length; ++i) {
            var currentCard = this._cards[i];
            func(currentCard, this.retrieveRuleFor(currentCard));
        }
    }

    /**
     * Generate a rule from JSON.
     */
    fromJson() {

    }

}