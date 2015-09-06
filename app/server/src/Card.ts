interface ICard {
    //TODO: use algebraic data types in the future
    /**
     * 0~9 for normal
     * 10 for skip
     * 11 for draw
     * 12 for reverse
     *
     * 13 for wild
     * 14 for wild draw four
     */
    content: number;

    /**
     * 0 for red
     * 1 for green
     * 2 for blue
     * 3 for yellow
     * 4 for black
     */
    color: number;
}

export class Card implements ICard {
    private _content: number;
    private _color: number;

    constructor(content: number, color: number) {
        if ((color > 4) || (color < 0)) {
            throw "Color out of range.";
        }
        if (color == 4) {
            if ((content != 13) && (content != 14)) {
                throw "Card content and color mismatch.";
            }
        }
        if (color != 4) {
            if ((content > 12) || (content < 0)) {
                throw "Card content and color mismatch.";
            }
        }
        this._content = content;
        this._color = color;
    }

    get content(): number {
        return this._content;
    }

    get color(): number {
        return this._color;
    }
}

export class OrdinaryCard extends Card {

}

export class SpecialCard extends Card {

}