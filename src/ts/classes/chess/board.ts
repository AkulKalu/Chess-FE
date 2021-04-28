import { ChessBoardNotation, ChessPieceProperties } from "../../dataStructures/chess";
import { ChessPieceFactory } from "../../factories/ChessPiece";
import { Board, BoardTable } from "../../globalTypes";
import { ChessPiece } from "./chessPiece";

export class ChessBoard implements Board {
    [key : string] : any;
    private readonly _state : BoardTable;

    constructor(boardState : BoardTable) {
        this._state = ChessBoard.copyBoardTable(boardState);

    }

    static copyBoardTable(table : BoardTable) : BoardTable {
        let empty = ChessBoard.createBoardTable();
        let pieceFactory = new ChessPieceFactory();
        Object.entries(table).forEach(([pos, piece]) => {
            if(piece instanceof  ChessPiece) {
                empty[pos] = pieceFactory.createPiece(piece.properties.getCopy(), piece.isPlayer)
            }
        })
        return empty;
    }

    movePiece(piece : ChessPiece, movePosition : string)  {
       this.pickUpAndPut(piece.properties.position, movePosition)
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
        this.pickUpAndPut(piece1.properties.position, piece2.properties.position)
    }

    protected  pickUpAndPut(fromField : string, toField : string) {
        let piece = this._state[fromField];
        if(piece instanceof ChessPiece) {
            piece.moveTo(toField);
            this._state[fromField] = null;
            this._state[toField] = piece
        }
    }

    setPieces(white : string[], black :string[], player : string)  {
        white.forEach(piece => {
            this.setPiece(ChessPieceProperties.fromNotation(piece), player === 'white' );
        })
        black.forEach(piece => {
            this.setPiece(ChessPieceProperties.fromNotation(piece, 'black'), player === 'black');
        })
    }

    setPiece(properties : ChessPieceProperties, isPlayer : boolean = false ) {
        const chessPieceFactory = new ChessPieceFactory();
        let chessPiece =  chessPieceFactory.createPiece(properties, isPlayer);
        this._state[properties.position] = chessPiece;
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