import {ChessBoard} from "../ts/classes";
import { BoardTable, DispatchAction } from "../ts/globalTypes";

export const initialState : BoardTable = ChessBoard.createBoardTable();



export const reducer = (state : BoardTable, action : DispatchAction) => {
    const board = new ChessBoard(state);
    board[action.type](...action.payload);
    
    // console.log(board.state['c8']?.moveSideways());
    return board.state;
    
  };




  