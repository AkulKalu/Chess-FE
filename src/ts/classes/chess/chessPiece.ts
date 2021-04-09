import { ChessBoardNotation, ChessPieceProperties } from "../../dataStructures/chess";
import { Piece, BoardTable, DataObject, MovePattern } from "../../globalTypes";
import { ChessBoardScaner } from "./boardScaner";
import { BasePattern, BishopPattern, KingPattern, KnightPattern, PawnPattern, QueenPattern, RookPattern } from "./movePatterns";


export class ChessPiece implements Piece {
    protected _properties : ChessPieceProperties;
    protected boardScanner : ChessBoardScaner;
    protected movePattern : MovePattern;
    protected _board : BoardTable;

    constructor(properties : ChessPieceProperties, board : BoardTable) {
        this._properties = properties
        this._board = board;
        this.movePattern = new BasePattern();
        this.boardScanner = new ChessBoardScaner(this);
    }

    getInteractiveFields() : DataObject<string[][]> {
        let fieldsInRange = this.movePattern.getFieldsInRange(this);
        let canMoveTo = this.boardScanner.getOpenFields(fieldsInRange);
        let canTakeAt = this.boardScanner.getPossibleTakes(fieldsInRange);
        
        return {
            openFields : canMoveTo,
            opponentFields : canTakeAt
        }
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
    get board() {
        return this._board
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
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
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
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePattern = new BishopPattern();
    }
}
export class Rook extends ChessPiece {
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePattern = new RookPattern();
    }
}
export class Knight extends ChessPiece {
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePattern = new KnightPattern();
    }
}
export class Queen extends ChessPiece {
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePattern = new QueenPattern();
    }
}
export class King extends ChessPiece {
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePattern = new KingPattern();
    }
}