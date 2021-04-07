export class ChessBoardNotation {
    ranks : string[];
    files : string[];
    constructor() {
        this.ranks = ['1', '2', '3' , '4' , '5' , '6' , '7', '8'];
        this.files = ['a','b','c','d','e','f','g','h'];
        Object.freeze(this.ranks);
        Object.freeze(this.files);
    }

    getFieldNotations() : string[] {
        let fieldColumns = this.files.map( file => this.ranks.map( rank => `${file}${rank}` ) );
        return fieldColumns.reduce<string[]>( (fields, column) => [...fields, ...column] , []);
    }
    getAxisFieldNotation(x : number, y : number) {
        let file = this.files[x];
        let rank = this.ranks[y];
        return `${file}${rank}`;
    }
}

export class ChessPieceProperties {
    type : string = '';
    position : string = ''
    color : string = '';
    constructor(type : string, boardPosition : string, color : string) {
        this.position = boardPosition;
        this.color = color;
        this.type = type;
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

