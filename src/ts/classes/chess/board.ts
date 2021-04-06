import { ChessPieceProperties } from "../../dataStructures/chess";
import { ChessPieceFactory } from "../../factories/ChessPiece";
import { Board, BoardTable } from "../../globalTypes";
import { ChessPiece } from "./chessPiece";

export class ChessBoard implements Board {
    [key : string] : any;
    private _state : BoardTable;

    constructor(boardState : BoardTable) {
        this._state = {...boardState};
    }

    movePiece(piece : ChessPiece, position : string)  {
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
    }

    setPieces(white : string[], black :string[])  {
        white.forEach(piece => {
            this.setPiece(piece);
        })
        black.forEach(piece => {
            this.setPiece(piece);
        })
    }

    setPiece(standardNotation : string) {
        const chessPieceFactory = new ChessPieceFactory(this.state);
        let type = standardNotation[0];
        let position = standardNotation.slice(1);
        let chessPiece =  chessPieceFactory.createPiece(new ChessPieceProperties(type, position, 'white'));
        this.state[position] = chessPiece;  
    }

    get state() {
        return this._state
    }
  
    static getFieldNotations() : string[] {
        const fieldLetters = ['a','b','c','d','e','f','g','h'];
        let notations : string[] = [];
        fieldLetters.forEach((val, i) => {
            fieldLetters.forEach((letter) => {
                notations.push(`${letter}${fieldLetters.length - i}`)
            })
        })
        return notations
    }
    
    static createBoardTable() : BoardTable {
        const board : BoardTable = {};
        this.getFieldNotations().forEach( notation => board[notation] = null )
        return board;
    }
}