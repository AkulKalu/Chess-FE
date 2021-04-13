import { BoardTable } from "../../globalTypes";
import { ChessPiece } from "./chessPiece";

export class ChessBoardScaner  {
    private piece : ChessPiece;
    private board : BoardTable;
    private selected : {
        canMoveTo : string[][],
        canTake : string[][]
    } ;

    constructor( board : BoardTable) {
        this.board = board;
        this.selected = {
            canMoveTo : [],
            canTake : [],
        }
    }

    getPlaysForPiece(piece : ChessPiece)  {
        if(piece) {
            this.piece = piece;
            this.selected.canMoveTo = [];
            this.selected.canTake = [];
            piece.getFieldsInRange().forEach( line => {
                this.scanForOpenFields(line)
                this.scanForOpponentPiece(line)
                })
            }
        return this.selected;
    }


    assertFieldIsInteractive(field : string) : boolean[] {
        let canMoveTo = this.selected.canMoveTo.filter( line => line.includes(field) );
        let canTake = this.selected.canTake.filter( line => line.includes(field) );
        return [Boolean(canMoveTo.length), Boolean(canTake.length)];
    }

    protected scanForOpenFields(line : string[]) {
        let block = 0
        let pieceBlocking = line.some( (field, idx) => {
            block = idx
            return this.board[field];
        })
        let res = pieceBlocking ? line.slice(0, block) : line;
        this.selected.canMoveTo.push(res)
    }

    protected scanForOpponentPiece(line : string[]) {
        let block = 0
        let pieceBlocking = line.some( (field, idx) => {
            block = idx
            return this.board[field];
        })
        if(pieceBlocking) {
            let piece =  this.board[line[block]]!
            if(piece.properties.color !== this.piece.properties.color) {
                this.selected.canTake.push([line[block]]);
            }
        }
        this.selected.canTake.push([]);
    }
}