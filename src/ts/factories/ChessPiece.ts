import { ChessPiece} from "../classes/chess/chessPiece";
import { ChessPieceProperties } from "../dataStructures/chess";
import PatternFactory from "./PatternFactory";

export class ChessPieceFactory {
    createPiece(properties: ChessPieceProperties, player: boolean = false): ChessPiece {
        let patternFactory = new PatternFactory();
        let chessPiece = class extends ChessPiece {
            constructor(properties: ChessPieceProperties, player: boolean = false) {
                super(properties, player);
                this.movePattern = patternFactory.getPatternFor(properties.type);
            }
        }
        return new chessPiece(properties, player)
    }
}

