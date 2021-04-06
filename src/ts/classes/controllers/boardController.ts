import { Action } from "../../dataStructures/app";
import { Board, DispatchAction } from "../../globalTypes";
import { ChessPiece } from "../chess/chessPiece";

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