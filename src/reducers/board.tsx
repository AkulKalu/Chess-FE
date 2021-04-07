
import { ChessBoard } from "../ts/classes/chess/board";
import { ChessBoardNotation } from "../ts/dataStructures/chess";
import { BoardTable, DispatchAction } from "../ts/globalTypes";

export const initialState : BoardTable = ChessBoard.createBoardTable();



export const reducer = (state : BoardTable, action : DispatchAction) => {
    const board = new ChessBoard(state);
    board[action.type](...action.payload);
    let x = new ChessBoardNotation()
    console.log(ChessBoard.getStartPositions());
    
  //  board.state['a2'].getInteractiveFields();
    return board.state;
    
  };




  