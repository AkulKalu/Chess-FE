
import { ChessBoard } from "../ts/classes/chess/board";
import { BoardTable, DispatchAction } from "../ts/globalTypes";

export const initialState : BoardTable = ChessBoard.createBoardTable();



export const reducer = (state : BoardTable, action : DispatchAction) => {
    const board = new ChessBoard(state);
    board[action.type](...action.payload);
    
  //  board.state['a2'].getInteractiveFields();
    return board.state;
    
  };




  