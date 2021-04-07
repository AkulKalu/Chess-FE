import { ChessBoardNotation, ChessPieceProperties } from "../../dataStructures/chess";
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
    
    static createBoardTable() : BoardTable {
        let notations = new ChessBoardNotation();
        return notations.getFieldNotations().reduce<BoardTable>( (board, field) => {
            board[field] = null;
            return board
        } , {})
    }

    static getStartPositions() : { boardTop : string[], boardBottom : string[]} {
        return {
            boardTop : ["Pa2", "Pb2", "Pc2", "Pd2", "Pe2", "Pf2", "Pg2", "Ph2", "Ra1", "Nb1", "Bc1", "Qd1", "Ke1", "Bf1", "Ng1", "Rh1"],
            boardBottom : ["Ra8", "Nb8", "Bc8", "Qd8", "Ke8", "Bf8", "Ng8", "Rh8", "Pa7", "Pb7", "Pc7", "Pd7", "Pe7", "Pf7", "Pg7", "Ph7"]
        }
    }
}