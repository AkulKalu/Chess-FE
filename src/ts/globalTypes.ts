


export interface Piece {
    type : string;
    boardPosition : string
    color : string;
    board : BoardTable;
}
export interface MovePattern {
    scan(piece : Piece) : string[][]
}
export interface ClassicChessPiece extends Piece {
   
}

export interface DispatchAction {
    type : string,
    payload : any[],
}

export interface Board {
    movePiece(piece : Piece, position : string) : any;
    pieceTakesPiece(piece1 : Piece, piece2 : Piece) : any;
    setPieces(white : string[], black :string[]) : any;
}


export interface BoardTable {
    [field : string] : null | ClassicChessPiece
}





