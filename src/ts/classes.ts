import {Board, BoardTable, Piece, DispatchAction} from './globalTypes';
import React from 'react';

export class ChessPiece implements Piece {

    type : string;
    boardPosition : string
    color : string;
    board : any

    constructor(type : string, boardPosition : string, color : string  ) {
        this.type = type;
        this.boardPosition = boardPosition;
        this.color = color;
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

export class Action implements DispatchAction {
    type : string;
    payload : any;

    constructor(type : string, payload : any) {
        this.type = type;
        this.payload = payload;
    }
}

export class ChessBoard implements Board {
    [key : string] : any;
    state : BoardTable;

    constructor(boardState : BoardTable) {
        this.state = {...boardState};
    }

    movePiece(piece : ChessPiece, position : string)  {
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
    }

    setPieces(white : string[], black :string[]) {
        white.forEach(piece => {
            let type = piece[0];
            let position = piece.slice(1);
            this.state[position] = new ChessPiece(type, position, 'white')
        })
        black.forEach(piece => {
            let type = piece[0];
            let position = piece.slice(1);
            this.state[position] = new ChessPiece(type, position, 'black')
        })
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