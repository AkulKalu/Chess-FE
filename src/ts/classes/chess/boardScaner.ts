import { ChessPiece } from "./chessPiece";

export class ChessBoardScaner  {
    private piece : ChessPiece;

    constructor(piece : ChessPiece) {
        this.piece = piece;
    }
  
    getOpenFields(movementLines : string[][]) :  string[][] {
        return movementLines.map(this.getOpenFieldsInLine);
    }

    protected getOpenFieldsInLine(line : string[]) {
        for (let i = 0; i < line.length; i++) {
            let field = line[i];
            let fieldPiece = this.piece.board[field];
            if(fieldPiece) {
                return line.slice(0, i); 
            } 
        }
        return line;
    }

    getPossibleTakes(movementLines : string[][]) : string[][] {
        return movementLines.map(this.getOpponentFieldsInLine);
    }

    protected getOpponentFieldsInLine(line : string[]) : string[] {
        for (let i = 0; i < line.length; i++) {
            let field = line[i];
            let fieldPiece = this.piece.board[field];
            if(fieldPiece) {
                return fieldPiece.properties.color === this.piece.properties.color ? [] : [field]
            } 
        }
        return [];
     }
}