import { ChessPiece} from "../classes/chess/chessPiece";
import { ChessPieceProperties } from "../dataStructures/chess";
import PatternFactory from "./PatternFactory";
import {PieceData} from "../globalTypes";

export class ChessPieceFactory {
    createPiece(piece: PieceData ): ChessPiece {
        let patternFactory = new PatternFactory();
        let chessPiece = class extends ChessPiece {
            constructor(properties: ChessPieceProperties) {
                super(properties);
                this.movePattern = patternFactory.getPatternFor(properties.type);
            }
        }
        return new chessPiece(new ChessPieceProperties(piece))
    }
}

