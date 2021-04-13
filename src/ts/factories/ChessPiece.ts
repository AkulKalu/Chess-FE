import { ChessPiece, Pawn, Bishop, Rook, Knight, King, Queen } from "../classes/chess/chessPiece";
import { ChessPieceProperties, ChessPieceNotation } from "../dataStructures/chess";

export class ChessPieceFactory  {
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
        return new Pawn(properties)
    }

    createBishop(properties : ChessPieceProperties) {
        return new Bishop(properties)
    }

    createRook(properties : ChessPieceProperties) {
        return new Rook(properties)
    }

    createKnight(properties : ChessPieceProperties) {
        return new Knight(properties)
    }

    createKing(properties : ChessPieceProperties) {
        return new King(properties)
    }

    createQueen(properties : ChessPieceProperties) {
        return new Queen(properties)
    }
}