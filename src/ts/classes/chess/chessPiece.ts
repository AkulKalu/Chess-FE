import { ChessBoardNotation, ChessPieceProperties } from "../../dataStructures/chess";
import { Piece, DataObject, MovePattern } from "../../globalTypes";
import { BasePattern } from "./movePatterns";

export class ChessPiece implements Piece {
    protected _properties : ChessPieceProperties;
    protected movePattern : MovePattern;
    protected player : boolean;

    constructor(properties : ChessPieceProperties, player : boolean = false) {
        this._properties = properties
        this.movePattern = new BasePattern();
        this.player = player
    }

    getFieldsInRange() : string[][] {
        return this.movePattern.getFieldsInRange(this);
    }

    moveTo(field : string) {
        this.properties.position = field
    }

    get isPlayer() {
        return this.player
    }

    get boardY() {
        return new ChessBoardNotation().ranks.indexOf(this.properties.position[1]);
    }

    get boardX() {
        return new ChessBoardNotation().files.indexOf(this.properties.position[0]);
    }

    get axisX() : DataObject<string[]> {
        let boardNotation = new ChessBoardNotation();
        return {
            left : boardNotation.files.slice(0, this.boardX),
            right : boardNotation.files.slice(this.boardX + 1)
        } 
    }

    get axisY() : DataObject<string[]> {
        let boardNotation = new ChessBoardNotation();
        return {
            top : boardNotation.ranks.slice(this.boardY + 1),
            bottom : boardNotation.ranks.slice(0, this.boardY)
        }
    }
   
    get properties() {
        return this._properties
    }
}

