import { ChessBoardNotation, ChessPieceProperties } from "../../dataStructures/chess";
import { Piece, DataObject, MovePattern } from "../../globalTypes";
import { BasePattern, BishopPattern, KingPattern, KnightPattern, PawnPattern, QueenPattern, RookPattern } from "./movePatterns";


export class ChessPiece implements Piece {
    protected _properties : ChessPieceProperties;
    protected movePattern : MovePattern;

    constructor(properties : ChessPieceProperties) {
        this._properties = properties
        this.movePattern = new BasePattern();
    }

    getFieldsInRange() : string[][] {
        return this.movePattern.getFieldsInRange(this);
    }

    moveTo(field : string) {
        this.properties.position = field
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
    get rank() {
        return this.properties.position[1];
    }

    get file() {
        return this.properties.position[0];
    }
}

export class Pawn extends ChessPiece {
    constructor(properties : ChessPieceProperties) {
        super(properties);
        this.movePattern = new PawnPattern();
    }

    getInteractiveFields() {
        // special case - pawns can't move diagonal unless takng opponent piece
        let [vertical, ...diagonal] = this.movePattern.getFieldsInRange(this);
        let canMoveTo = this.boardScanner.getOpenFields([vertical]);
        let canTakeAt = this.boardScanner.getPossibleTakes(diagonal);
        
        
        return {
            openFields : canMoveTo,
            opponentFields : canTakeAt
        }
    }
} 
export class Bishop extends ChessPiece {
    constructor(properties : ChessPieceProperties) {
        super(properties);
        this.movePattern = new BishopPattern();
    }
}
export class Rook extends ChessPiece {
    constructor(properties : ChessPieceProperties) {
        super(properties);
        this.movePattern = new RookPattern();
    }
}
export class Knight extends ChessPiece {
    constructor(properties : ChessPieceProperties, ) {
        super(properties);
        this.movePattern = new KnightPattern();
    }
}
export class Queen extends ChessPiece {
    constructor(properties : ChessPieceProperties) {
        super(properties);
        this.movePattern = new QueenPattern();
    }
}
export class King extends ChessPiece {
    constructor(properties : ChessPieceProperties) {
        super(properties);
        this.movePattern = new KingPattern();
    }
}