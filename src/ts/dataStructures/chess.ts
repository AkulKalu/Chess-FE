import { DataObject } from "../globalTypes";


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

