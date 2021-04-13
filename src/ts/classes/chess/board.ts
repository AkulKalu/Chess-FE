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
        this.state[piece.properties.position] = null;
        piece.moveTo(position);
        this.state[position] = piece;
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
        this.state[piece1.properties.position] = null;
        piece1.moveTo(piece2.properties.position);
        this.state[piece1.properties.position] = null;
        this.state[piece1.properties.position] = piece1;
    }

    setPieces(white : string[], black :string[])  {
        white.forEach(piece => {
            this.setPiece(ChessPieceProperties.fromNotation(piece));
        })
        black.forEach(piece => {
            this.setPiece(ChessPieceProperties.fromNotation(piece, 'black'));
        })
    }

    setPiece(properties : ChessPieceProperties) {
        const chessPieceFactory = new ChessPieceFactory();
        let chessPiece =  chessPieceFactory.createPiece(properties);
        this.state[properties.position] = chessPiece;  
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
            boardTop :  ["Ra8", "Nb8", "Bc8", "Qd8", "Ke8", "Bf8", "Ng8", "Rh8", "Pa7", "Pb7", "Pc7", "Pd7", "Pe7", "Pf7", "Pg7", "Ph7"],
            boardBottom : ["Pa2", "Pb2", "Pc2", "Pd2", "Pe2", "Pf2", "Pg2", "Ph2", "Ra1", "Nb1", "Bc1", "Qd1", "Ke1", "Bf1", "Ng1", "Rh1"],
        }
    }
}