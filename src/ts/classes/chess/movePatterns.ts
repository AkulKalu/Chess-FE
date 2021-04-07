import { ChessBoardNotation } from "../../dataStructures/chess";
import { MovePattern } from "../../globalTypes";
import { ChessPiece } from "./chessPiece";

class DiagonalPattern implements MovePattern {
    protected range : number;

    constructor(range : number = 8) {
        this.range = range
    }

    getFieldsInRange(piece : ChessPiece) : string[][] {
        let leftTopLine = [...piece.axisX.left].reverse().map( this.getIncrementedFieldByRank(piece.rank, 1) );
        let rightTopLine = piece.axisX.right.map( this.getIncrementedFieldByRank(piece.rank, 1) );
        let bottomRightLine = piece.axisX.right.map( this.getIncrementedFieldByRank(piece.rank, -1) );
        let bottomLeftLine = [...piece.axisX.left].reverse().map( this.getIncrementedFieldByRank(piece.rank, -1) );
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

    getFieldsInRange(piece : ChessPiece) : string[][] {
        let leftSide = piece.axisX.left.map( file => `${file}${piece.rank}` );
        let rightSide = piece.axisX.right.map( file => `${file}${piece.rank}` );
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

    getFieldsInRange(piece : ChessPiece) : string[][] {
        let topSide = piece.axisY.top.map( rank => `${piece.file}${rank}` );
        let bottomSide = piece.axisY.bottom.map( rank => `${piece.file}${rank}` );
        return [this.getInSetRange(topSide), this.getInSetRange( bottomSide.reverse() )];
    }

    protected getInSetRange(positions : string[]) {
        return positions.slice(0 , this.range);
    }
} 
class HorsePattern implements MovePattern {
    getFieldsInRange(piece : ChessPiece) : string[][] {
        let boardNotation = new ChessBoardNotation();
        let jumpCoordinates =  [[3, 1], [3, -1], [-3 , 1], [-3, -1]];
        let jumpsX = jumpCoordinates.map( ([x, y]) =>{
            return [boardNotation.getAxisFieldNotation(piece.boardX + x, piece.boardY + y)];
        } )
        let jumpsY = jumpCoordinates.map(([y, x]) => {
            return [boardNotation.getAxisFieldNotation(piece.boardX + x, piece.boardY + y)];
        })

        return  this.filterOutOfBounds([...jumpsX, ...jumpsY]);
    }
    filterOutOfBounds(fields : string[][]) {
        return fields.filter( ([field]) =>  new ChessBoardNotation().getFieldNotations().includes(field))
    }
   
}

export class BasePattern implements MovePattern {
    pattern : MovePattern[] = [];
    getFieldsInRange(piece : ChessPiece) {
        return this.pattern.reduce<string[][]>( (prev , movePattern) => [...prev, ...movePattern.getFieldsInRange(piece)]  , [] );
    }
}

export class PawnPattern extends BasePattern {
    constructor() {
        super()
        this.pattern = [new VerticalPattern(2), new DiagonalPattern(1)]
    }
    getFieldsInRange(piece : ChessPiece) {
        let [vertical, diagonal] = this.pattern;
        let canMoveTo = vertical.getFieldsInRange(piece);
        let canTake = diagonal.getFieldsInRange(piece)
        if(piece.rank !== '2') canMoveTo.pop();
        return [...canMoveTo, ...canTake]
    }
}
export class BishopPattern extends BasePattern {
    constructor() {
        super();
        this.pattern = [new DiagonalPattern()]
    }
}
export class RookPattern extends BasePattern {
    constructor() {
        super();
        this.pattern = [new HorizontalPattern(), new VerticalPattern()];
    }
}
export class KnightPattern extends BasePattern {
    constructor() {
        super();
        this.pattern = [new HorsePattern()];
    }
}
export class QueenPattern extends BasePattern {
    constructor() {
        super();
        this.pattern = [new VerticalPattern(), new HorizontalPattern(), new DiagonalPattern()];
    }
}
export class KingPattern extends BasePattern {
    constructor() {
        super();
        this.pattern =[new VerticalPattern(1), new HorizontalPattern(1), new DiagonalPattern(1)];
    }
}