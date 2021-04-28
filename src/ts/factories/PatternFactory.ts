import { ChessPieceNotation } from "../dataStructures/chess";
import {
    BishopPattern,
    KingPattern,
    KnightPattern,
    PawnPattern,
    QueenPattern,
    RookPattern
} from "../classes/chess/movePatterns";

export default  class PatternFactory {
    getPatternFor(chessPiece : string) {
        let types = new ChessPieceNotation();
        switch (chessPiece) {
            case types.bishop :
                return  new BishopPattern();
            case types.rook :
                return  new RookPattern();
            case types.queen :
                return  new QueenPattern();
            case types.king :
                return  new KingPattern();
            case types.knight :
                return  new KnightPattern();
            default:
                return new PawnPattern()
        }
    }
}

