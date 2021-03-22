import {ChessBoard} from "../ts/classes";
import { BoardTable, DispatchAction } from "../ts/globalTypes";

export const initialState : BoardTable = ChessBoard.createBoardTable();



export const reducer = (state : BoardTable, action : DispatchAction) => {
    const {type, payload } = action;
    
    return state;
    
  };




  