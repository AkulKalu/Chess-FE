import {Board, BoardTable, Piece, DispatchAction, ClassicChessPiece, MovePattern} from './globalTypes';
import React from 'react';
const typeNotations : { [key : string] : string } = {
    pawn : 'P',
    bishop : 'B',
    knight : 'N',
    rook : 'R',
    king : 'K',
    queen : 'Q',
}
Object.freeze(typeNotations);

class ChessPieceProperties {
    type : string = '';
    boardPosition : string = ''
    color : string = '';
    ranks : string[] = ['1', '2', '3' , '4' , '5' , '6' , '7', '8'];
    files : string[] = ['a','b','c','d','e','f','g','h'];
    protected movePatterns : Array<MovePattern> = [];
    protected _board : BoardTable = {};

    constructor(type : string, boardPosition : string, color : string) {
        this.boardPosition = boardPosition;
        this.color = color;
        this.type = type;
    }

    set board(board : BoardTable) {
        this._board = board;
    }
    get boardY() {
        return this.ranks.indexOf(this.boardPosition[1]);
    }
    get boardX() {
        return this.files.indexOf(this.boardPosition[0]);
    }
    get axisXLeft() {
        return this.files.slice(0, this.boardX);
    }
    get axisXright(){
        return this.files.slice(this.boardX + 1);
    } 
    get axisYTop() {
        return this.ranks.slice(this.boardY + 1);
    }
    get axisYBottom(){
        return this.files.slice(0, this.boardY);
    } 
    get rank() {
        return this.boardPosition[1];
    }
    get file() {
        return this.boardPosition[0];
    }
}
export class ChessPiece extends ChessPieceProperties implements Piece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color)
    }
    getInteractiveFields() {
        let fieldsInRange =  this.movePatterns.reduce( (prev, movePattern) => [...prev, ...movePattern.scan(this)]  , [] );
        let canMoveTo = this.getOpenFields(fieldsInRange);
        let canTakeAt = this.getPossibleTakes(fieldsInRange);
        return {
            openFields : canMoveTo,
            opponentFields : canTakeAt
        }
    }

    protected getOpenFields(movementLines : string[][]) :  string[][] {
        return movementLines.map(this.getOpenFieldsInLine);
    }

    protected getOpenFieldsInLine(line : string[]) {
        for (let i = 0; i < line.length; i++) {
            let field = line[i];
            let fieldPiece = this._board[field];
            if(fieldPiece) {
                return line.slice(0, i); 
            } 
        }
        return line;
    }

    protected getPossibleTakes(movementLines : string[][]) : string[][] {
        return movementLines.map(this.getOpponentFieldsInLine);
    }

    protected getOpponentFieldsInLine(line : string[]) : string[] {
        for (let i = 0; i < line.length; i++) {
            let field = line[i];
            let fieldPiece = this._board[field];
            if(fieldPiece) {
                return fieldPiece.color === this.color ? [] : [field]
            } 
        }
        return [];
     }

    static getStartPositions() : { boardTop : string[], boardBottom : string[]} {
        let notations = ChessBoard.getFieldNotations();
        let topOfBoard = notations.filter(filterNotationsByRank(['7', '8']));
        let bottomOfBoard = notations.filter(filterNotationsByRank(['1', '2']));
        topOfBoard = topOfBoard.map(setPiecePosition('7'));
        bottomOfBoard = bottomOfBoard.map(setPiecePosition('2'))

        function filterNotationsByRank(ranks : string[]) : (val : string) => boolean {
            return (notation) : boolean => {
                let rank : string = notation[1];
                return ranks.includes(rank)
            }
        }
        function setPiecePosition(pawnsAreAt : string ) : (val : string) => string {
            let highValueFiles : { [index : string] : string } = {
                a : 'R',
                b : 'N',
                c : 'B',
                d : 'Q',
                e : 'K',
                f : 'B',
                g : 'N',
                h : 'R' 
            }
            return (notation : string) : string  => {
                let rank : string = notation[1];
                let file : string = notation[0];
                return rank === pawnsAreAt ? `P${notation}` : `${highValueFiles[file]}${notation}`
            }
        }
        return {
            boardTop :topOfBoard,
            boardBottom : bottomOfBoard
        }
    }
}


class DiagonalPattern implements MovePattern {
    protected range : number;

    constructor(range : number = 8) {
        this.range = range
    }

    scan(piece : ChessPiece) : string[][] {
        let leftTopLine = [...piece.axisXLeft].reverse().map( this.getIncrementedFieldByRank(piece.rank, 1) );
        let rightTopLine = piece.axisXright.map( this.getIncrementedFieldByRank(piece.rank, 1) );
        let bottomRightLine = piece.axisXright.map( this.getIncrementedFieldByRank(piece.rank, -1) );
        let bottomLeftLine = [...piece.axisXLeft].reverse().map( this.getIncrementedFieldByRank(piece.rank, -1) );
        return [leftTopLine, rightTopLine, bottomRightLine, bottomLeftLine].map( line => {
            return this.getInSetRange( this.filterOutOfBounds(line) )
        })
    }

    protected filterOutOfBounds(positions : string[]) {
        return positions.filter(position => {
            let rank = Number( position.slice(1) );
            return rank >= 1 && rank <= 8
        })
    }

    protected getInSetRange(positions : string[]) {
        return positions.slice(0 , this.range);
    }

    protected getIncrementedFieldByRank(currentRank : string | number, incrementDirection : number) {
        return (file : string, i : number) => `${file}${Number(currentRank) + ((i + 1) *  incrementDirection)}`
    }
}
class HorizontalPattern implements MovePattern {
    protected range : number;

    constructor(range : number = 8) {
        this.range = range
    }

    scan(piece : ChessPiece) : string[][] {
        let leftSide = piece.axisXLeft.map( file => `${file}${piece.rank}` );
        let rightSide = piece.axisXright.map( file => `${file}${piece.rank}` );
        return [this.getInSetRange( leftSide.reverse() ), this.getInSetRange(rightSide)];
    }

    protected getInSetRange(positions : string[]) {
        return positions.slice(0 , this.range);
    }
} 
class VerticalPattern implements MovePattern {
    protected range : number;

    constructor(range : number = 8) {
        this.range = range
    }

    scan(piece : ChessPiece) : string[][] {
        let topSide = piece.axisYTop.map( rank => `${piece.file}${rank}` );
        let bottomSide = piece.axisYBottom.map( rank => `${piece.file}${rank}` );
        return [this.getInSetRange(topSide), this.getInSetRange( bottomSide.reverse() )];
    }

    protected getInSetRange(positions : string[]) {
        return positions.slice(0 , this.range);
    }
} 
class HorsePattern implements MovePattern {
    scan(piece : ChessPiece) : string[][] {
        let leftPivot = piece.axisXLeft[piece.boardX - 3];
        let rightPivot = piece.axisXLeft[piece.boardX + 3];
        let topPivot = piece.axisYTop[piece.boardY + 3];
        let bottomPivot = piece.axisYTop[piece.boardY - 3];
        let jumpsY = [topPivot, bottomPivot].reduce( (jumps, pivotRank) => {
            if(pivotRank) {
                let pivoted = [];
                let pivotLeftFile = piece.files[piece.boardX - 1];
                let pivotRightFile = piece.files[piece.boardX + 1];
                if(pivotLeftFile) pivoted.push( [`${pivotLeftFile}${pivotRank}`] );
                if(pivotRightFile) pivoted.push( [`${pivotLeftFile}${pivotRank}`] );
                return [...jumps, ...pivoted]
            }
            return  jumps;
        }, [] )
        let jumpsX = [leftPivot, rightPivot].reduce( (jumps, pivotFile) => {
            if(pivotFile) {
                let pivoted = [];
                let pivotTopRank = piece.files[piece.boardY + 1];
                let pivotBottomRank = piece.files[piece.boardX - 1];
                if(pivotTopRank) pivoted.push( [`${pivotFile}${pivotTopRank}`] );
                if(pivotBottomRank) pivoted.push( [`${pivotFile}${pivotBottomRank}`] );
                return [...jumps, ...pivoted]
            }
            return  jumps;
        }, [] )
        return [...jumpsY, jumpsX];
    }
}
export class Pawn extends ChessPiece implements ClassicChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
        this.movePatterns = [new VerticalPattern(2), new HorizontalPattern()]
    }
    canMoveTo() {
       
    }

    //  canTake() {
    //     let possibleTakes = [`${this.files[this.boardX - 1]}${this.ranks[this.boardY + 1]}`,
    //                          `${this.files[this.boardX + 1]}${this.ranks[this.boardY + 1]}`];
    //     return this.getPossibleTakes([possibleTakes]);
    //  }
}
export class Bishop extends ChessPiece implements ClassicChessPiece {
  
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
        this.movePatterns = [new DiagonalPattern()]
    }
}
export class Rook extends ChessPiece implements ClassicChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
        this.movePatterns = [new HorizontalPattern(), new VerticalPattern()]
    }
}
export class Knight extends ChessPiece implements ClassicChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
        this.movePatterns = [new HorsePattern()];
    }
}
export class Queen extends ChessPiece implements ClassicChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
        this.movePatterns = [new VerticalPattern(), new HorizontalPattern(), new DiagonalPattern()]
    }
}
export class King extends ChessPiece implements ClassicChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
        this.movePatterns = [new VerticalPattern(1), new HorizontalPattern(1), new DiagonalPattern(1)]
    }
}

export class ChessPieceFactory  {
    createPiece(type : string, boardPosition : string, color : string) : ClassicChessPiece {
        let types = typeNotations;
        switch (type) {
            case types.bishop:
                return this.createBishop(boardPosition, color);
            case types.rook:
                return this.createRook(boardPosition, color);
            case types.knight:
                return this.createKnight(boardPosition, color);
            case types.king:
                return this.createKing(boardPosition, color);
            case types.queen:
                return this.createQueen(boardPosition, color);
            default:
                return this.createPawn(boardPosition, color);
        }
    }

    createPawn( boardPosition : string, color : string) {
        return new Pawn('P', boardPosition, color)
    }

    createBishop( boardPosition : string, color : string) {
        return new Bishop('B', boardPosition, color)
    }

    createRook( boardPosition : string, color : string) {
        return new Rook('R', boardPosition, color)
    }

    createKnight( boardPosition : string, color : string) {
        return new Knight('N', boardPosition, color)
    }

    createKing( boardPosition : string, color : string) {
        return new King('K', boardPosition, color)
    }

    createQueen( boardPosition : string, color : string) {
        return new Queen('Q', boardPosition, color)
    }
}

export class ChessBoard implements Board {
    [key : string] : any;
    private _state : BoardTable;

    constructor(boardState : BoardTable) {
        this._state = {...boardState};
    }

    movePiece(piece : ChessPiece, position : string)  {
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
    }

    setPieces(white : string[], black :string[])  {
        white.forEach(piece => {
            this.setPiece(piece);
        })
        black.forEach(piece => {
            this.setPiece(piece);
        })
    }

    setPiece(standardNotation : string) {
        const chessPieceFactory = new ChessPieceFactory();
        let type = standardNotation[0];
        let position = standardNotation.slice(1);
        let chessPiece =  chessPieceFactory.createPiece(type, position, 'white');
        this.state[position] = chessPiece;
        chessPiece.board = this.state;
    }

    get state() {
        return this._state
    }
  
    static getFieldNotations() : string[] {
        const fieldLetters = ['a','b','c','d','e','f','g','h'];
        let notations : string[] = [];
        fieldLetters.forEach((val, i) => {
            fieldLetters.forEach((letter) => {
                notations.push(`${letter}${fieldLetters.length - i}`)
            })
        })
        return notations
    }
    
    static createBoardTable() : BoardTable {
        const board : BoardTable = {};
        this.getFieldNotations().forEach( notation => board[notation] = null )
        return board;
    }
}

export class BoardDispatch implements Board {
    dispatcher : React.Dispatch<DispatchAction>;

    constructor(dispatcher : React.Dispatch<DispatchAction>) {
        this.dispatcher = dispatcher;
    }

    movePiece(piece : ChessPiece, position : string)  {
        this.dispatcher(new Action(this.movePiece.name, [piece, position]));
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
        this.dispatcher(new Action(this.pieceTakesPiece.name, [piece1, piece2]));
    }

    setPieces(white : string[], black :string[]) {
        this.dispatcher(new Action(this.setPieces.name, [white, black]));
    }
}
export class Action implements DispatchAction {
    type : string;
    payload : any;

    constructor(type : string, payload : any) {
        this.type = type;
        this.payload = payload;
    }
}