import { ChessPieceProperties } from "../../dataStructures/chess";
import { Piece, MovePattern, BoardTable, DataObject } from "../../globalTypes";
import { ChessBoard } from "./board";
import { ChessBoardScaner } from "./boardScaner";
import { VerticalPattern, DiagonalPattern, HorizontalPattern, HorsePattern } from "./movePatterns";

export class ChessPiece implements Piece {
    protected _properties : ChessPieceProperties;
    ranks : string[] = ['1', '2', '3' , '4' , '5' , '6' , '7', '8'];
    files : string[] = ['a','b','c','d','e','f','g','h'];
    boardScanner : ChessBoardScaner;
    protected movePatterns : Array<MovePattern> = [];
    protected _board : BoardTable;

    constructor(properties : ChessPieceProperties, board : BoardTable) {
        this._properties = properties
        this._board = board;
        this.boardScanner = new ChessBoardScaner(this);
    }

    getInteractiveFields() {
        let fieldsInRange =  this.movePatterns.reduce<string[][]>( (prev , movePattern) => [...prev, ...movePattern.scan(this)]  , [] );
        let canMoveTo = this.boardScanner.getOpenFields(fieldsInRange);
        let canTakeAt = this.boardScanner.getPossibleTakes(fieldsInRange);
        return {
            openFields : canMoveTo,
            opponentFields : canTakeAt
        }
    }

    get boardY() {
        return this.ranks.indexOf(this.properties.position[1]);
    }

    get boardX() {
        return this.files.indexOf(this.properties.position[0]);
    }

    get axisX() : DataObject<string[]> {
        return {
            left : this.files.slice(0, this.boardX),
            right : this.files.slice(this.boardX + 1)
        } 
    }

    get axisY() : DataObject<string[]> {
        return {
            top : this.ranks.slice(this.boardY + 1),
            bottom : this.ranks.slice(0, this.boardY)
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

    static getStartPositions() : { boardTop : string[], boardBottom : string[]} {
        let notations = ChessBoard.getFieldNotations();
        let topOfBoard = notations.filter(filterNotationsByRank(['7', '8']));
        let bottomOfBoard = notations.filter(filterNotationsByRank(['1', '2']));
        topOfBoard = topOfBoard.map(setPiecePosition('7'));
        bottomOfBoard = bottomOfBoard.map(setPiecePosition('2'))

        function filterNotationsByRank(ranks : string[]) : (val : string) => boolean {
            return (notation) : boolean => {
                let rank : string = notation[1];
                return ranks.includes(rank)
            }
        }
        function setPiecePosition(pawnsAreAt : string ) : (val : string) => string {
            let highValueFiles : { [index : string] : string } = {
                a : 'R',
                b : 'N',
                c : 'B',
                d : 'Q',
                e : 'K',
                f : 'B',
                g : 'N',
                h : 'R' 
            }
            return (notation : string) : string  => {
                let rank : string = notation[1];
                let file : string = notation[0];
                return rank === pawnsAreAt ? `P${notation}` : `${highValueFiles[file]}${notation}`
            }
        }
        return {
            boardTop :topOfBoard,
            boardBottom : bottomOfBoard
        }
    }
}

export class Pawn extends ChessPiece {
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePatterns = [new VerticalPattern(2), new DiagonalPattern()]
    }
   

} 
export class Bishop extends ChessPiece {
  
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePatterns = [new DiagonalPattern()]
    }
}
export class Rook extends ChessPiece {
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePatterns = [new HorizontalPattern(), new VerticalPattern()]
    }
}
export class Knight extends ChessPiece {
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePatterns = [new HorsePattern()];
    }
}
export class Queen extends ChessPiece {
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePatterns = [new VerticalPattern(), new HorizontalPattern(), new DiagonalPattern()]
    }
}
export class King extends ChessPiece {
    constructor(properties : ChessPieceProperties, board : BoardTable) {
        super(properties, board);
        this.movePatterns = [new VerticalPattern(1), new HorizontalPattern(1), new DiagonalPattern(1)]
    }
}