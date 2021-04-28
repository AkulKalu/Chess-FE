import { Action } from "../../dataStructures/app";
import { Board, DispatchAction } from "../../globalTypes";
import { ChessPiece } from "../chess/chessPiece";

export class BoardController implements Board {
    actionDispatcher : React.Dispatch<DispatchAction>;

    constructor(dispatcher : React.Dispatch<DispatchAction>) {
        this.actionDispatcher = dispatcher;
    }

    movePiece(piece : ChessPiece, position : string)  {
        this.actionDispatcher(new Action(this.movePiece.name, [piece, position]));
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
        this.actionDispatcher(new Action(this.pieceTakesPiece.name, [piece1, piece2]));
    }

    setPieces(white : string[], black :string[], player : string = 'white') {
        this.actionDispatcher(new Action(this.setPieces.name, [white, black, player]));
    }
}