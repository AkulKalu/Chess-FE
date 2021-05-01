import {BoardTable, PieceData} from "../globalTypes"

export class ChessBoardNotation {
    ranks : string[]
    files : string[]
    constructor() {
        this.ranks = ['1', '2', '3' , '4' , '5' , '6' , '7', '8']
        this.files = ['a','b','c','d','e','f','g','h']
        Object.freeze(this.ranks)
        Object.freeze(this.files)
    }

    getFieldNotations() : string[] {
        let fieldColumns = [...this.ranks].reverse().map( rank => this.files.map( file => `${file}${rank}` ) )
        return fieldColumns.reduce<string[]>( (fields, column) => [...fields, ...column] , [])
    }
    getAxisFieldNotation(x : number, y : number) {
        let file = this.files[x]
        let rank = this.ranks[y]
        return `${file}${rank}`
    }
}

export class ChessPieceProperties {
    type : string
    position : string
    color : string

    constructor(properties : PieceData) {
        this.position = properties.position
        this.color = properties.color
        this.type = properties.type
    }

    get rank() {
        return this.position[1]
    }

    get file() {
        return this.position[0]
    }

    static dataFromNotation(notation : string, color : string = 'white') : PieceData {
        return {
            type : notation[0],
            position : notation.slice(1),
            color : color
        }
    }
}

export class ChessPieceNotation {
    pawn = 'P';
    bishop = 'B';
    knight = 'N';
    rook = 'R';
    king = 'K';
    queen = 'Q';

    constructor() {
        Object.freeze(this);
    }
    getFullName(notation : string) : string | undefined {
        let entrie =  Object.entries(this).filter(
            (entrie) => entrie[1] === notation
        )[0]
        return entrie && entrie[0];
    }
}

export class ChessGame {
    player : string;
    turn: string;
    lastMove : string = '';
    totalMoves = 0;
    pastMoves : string[] = [];
    board : BoardTable;

    constructor(playerColor : string, board : BoardTable, turn : string = 'white') {
        this.player = playerColor
        this.turn = turn;
        this.board = board
    }
    get isPlayersTurn() {
        return this.player === this.turn;
    }

}

