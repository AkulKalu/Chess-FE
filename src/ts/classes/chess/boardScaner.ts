import { BoardTable, DataObject } from "../../globalTypes";
import { ChessPiece } from "./chessPiece";

export class ChessBoardScaner  {
    private piece : ChessPiece;
    private board : BoardTable;
    private selected ;

    constructor( board : BoardTable) {
        this.board = board;
    }

    getPlaysForPiece(piece : ChessPiece)  {
        this.piece = piece;
        this.selected = {
            canMoveTo : [],
            canTake : [],
        }
        piece.getFieldsInRange().forEach( line => this.scanLine(line))
        return this.selected;
    }
  
    protected scanLine( line : string[] ) {
        let openFields : string[] = [];
        let opponentField : string[] = [];  
        for (let i = 0; i < line.length; i++) {
            let field = line[i];
            let fieldPiece = this.board[field];
            if(fieldPiece) {
                if(fieldPiece.properties.color !== this.piece.properties.color) {
                    opponentField = [field]
                }
                break;
            } 
            openFields.push(field)
        }
        this.selected.canMoveTo.push(openFields);
        this.selected.canTake.push(opponentField);
    }
}