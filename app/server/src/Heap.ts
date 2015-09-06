import {Card} from "./Card";
import {Rule} from "./Rule";

export class Heap {

    _size: number;
    // TODO: make the colors pluggable. Read from some configuration file.

    _cards: Array<Card>;

    get nextCard(): Card {
        return this._cards[0];
    }

    constructor(rule: Rule) {
        rule.iterateWith(this.addCardWithNumber);
        this.shuffle();
    }

    private addCardWithNumber(card: Card, numberToAdd: number) {
        for (var i = 0; i < numberToAdd; ++i) {
            this._cards.push(card); // TODO: Is the memory management here correct?
        }
    }

    shuffle() {
        this._cards = this.shuffleArray(this._cards);
    }

    /**
     * Code taken from <a href="http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript">Stackoverflow</a>
     * Function used to shuffle an array.
     *
     * @param array
     * @returns {any}
     */
    private static shuffleArray(array) {
        var counter = array.length, temp, index;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    reset() {

    }

    get ifEmpty(): boolean {
        return (this._cards.length == 0);
    }


}