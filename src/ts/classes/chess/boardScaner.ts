import { DataObject } from "../../globalTypes";
import { ChessPiece } from "./chessPiece";

export class ChessBoardScaner  {
    private piece : ChessPiece;

    constructor(piece : ChessPiece) {
        this.piece = piece;
    }
  
    getOpenFields(movementLines : string[][]) :  string[][] {
        return movementLines.map(line => this.scanLine(line).openFields);
    }

    getPossibleTakes(movementLines : string[][]) : string[][] {
        return movementLines.map(line => this.scanLine(line).opponentField);
    }
    protected scanLine( line : string[] ) : DataObject<string[]> {
        let openFields : string[] = [];
        let opponentField : string[] = [];  
        for (let i = 0; i < line.length; i++) {
            let field = line[i];
            let fieldPiece = this.piece.board[field];
            if(fieldPiece) {
                if(fieldPiece.properties.color !== this.piece.properties.color) {
                    opponentField = [field]
                }
                break;
            } 
            openFields.push(field)
        }
        return {
            openFields : openFields,
            opponentField : opponentField
        };
    }
}