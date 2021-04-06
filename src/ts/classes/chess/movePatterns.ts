import { MovePattern } from "../../globalTypes";
import { ChessPiece } from "./chessPiece";

export class DiagonalPattern implements MovePattern {
    protected range : number;

    constructor(range : number = 8) {
        this.range = range
    }

    scan(piece : ChessPiece) : string[][] {
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
export class HorizontalPattern implements MovePattern {
    protected range : number;

    constructor(range : number = 8) {
        this.range = range
    }

    scan(piece : ChessPiece) : string[][] {
        let leftSide = piece.axisX.left.map( file => `${file}${piece.rank}` );
        let rightSide = piece.axisX.right.map( file => `${file}${piece.rank}` );
        return [this.getInSetRange( leftSide.reverse() ), this.getInSetRange(rightSide)];
    }

    protected getInSetRange(positions : string[]) {
        return positions.slice(0 , this.range);
    }
} 
export class VerticalPattern implements MovePattern {
    protected range : number;

    constructor(range : number = 8) {
        this.range = range
    }

    scan(piece : ChessPiece) : string[][] {
        let topSide = piece.axisY.top.map( rank => `${piece.file}${rank}` );
        let bottomSide = piece.axisY.bottom.map( rank => `${piece.file}${rank}` );
        return [this.getInSetRange(topSide), this.getInSetRange( bottomSide.reverse() )];
    }

    protected getInSetRange(positions : string[]) {
        return positions.slice(0 , this.range);
    }
} 
export class HorsePattern implements MovePattern {
    scan(piece : ChessPiece) : string[][] {
        let leftPivot = piece.axisX.left[piece.boardX - 3];
        let rightPivot = piece.axisX.left[piece.boardX + 3];
        let topPivot = piece.axisY.top[piece.boardY + 3];
        let bottomPivot = piece.axisY.top[piece.boardY - 3];
       
        let jumpsY = [topPivot, bottomPivot].reduce<string[][]>( (jumps, pivotRank) => {
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
        let jumpsX = [leftPivot, rightPivot].reduce<string[][]>( (jumps, pivotFile) => {
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
        
        return  [ ...jumpsX,...jumpsY];
    }
}

// class MovePatternFactory {
//     constructor(chessPieceType) {
//         let type
//     }
// }