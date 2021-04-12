
import { ChessPiece } from "./classes/chess/chessPiece";
import { ChessPieceProperties } from "./dataStructures/chess";

export interface Piece {
    readonly properties : ChessPieceProperties
}
export interface MovePattern {
    getFieldsInRange(piece : Piece) : string[][]
}

export interface DataObject<Type> {
    [key : string] : Type
}
export interface ReducerObject<stateType, actionsType> {
    state : stateType;
    actions : actionsType 
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
    [field : string] : null | ChessPiece
}





