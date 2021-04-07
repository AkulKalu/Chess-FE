import { ChessPiece, Pawn, Bishop, Rook, Knight, King, Queen } from "../classes/chess/chessPiece";
import { ChessPieceProperties, ChessPieceNotation } from "../dataStructures/chess";
import { BoardTable } from "../globalTypes";

export class ChessPieceFactory  {
    board : BoardTable;

    constructor(board : BoardTable) {
        this.board = board
    }

    createPiece(properties : ChessPieceProperties) : ChessPiece {
        let types = new ChessPieceNotation();
       
        switch (properties.type) {
            case types.bishop:
                return this.createBishop(properties);
            case types.rook:
                return this.createRook(properties);
            case types.knight:
                return this.createKnight(properties);
            case types.king:
                return this.createKing(properties);
            case types.queen:
                return this.createQueen(properties);
            default:
                return this.createPawn(properties);
        }
    }

    createPawn(properties : ChessPieceProperties) {
        return new Pawn(properties, this.board)
    }

    createBishop(properties : ChessPieceProperties) {
        return new Bishop(properties, this.board)
    }

    createRook(properties : ChessPieceProperties) {
        return new Rook(properties, this.board)
    }

    createKnight(properties : ChessPieceProperties) {
        return new Knight(properties, this.board)
    }

    createKing(properties : ChessPieceProperties) {
        return new King(properties, this.board)
    }

    createQueen(properties : ChessPieceProperties) {
        return new Queen(properties, this.board)
    }
}