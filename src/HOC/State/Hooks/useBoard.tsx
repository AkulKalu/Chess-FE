import { useEffect, useReducer } from 'react';
import { initialState, reducer } from '../../../reducers/board';
import { ChessBoard } from '../../../ts/classes/chess/board';
import { BoardController } from '../../../ts/classes/controllers/boardController';
import { Board, BoardTable, ReducerObject } from '../../../ts/globalTypes';





export default function useBoard() : ReducerObject<BoardTable, Board> {
    const [state, dispatch] = useReducer( reducer, initialState );
    const boardController = new BoardController(dispatch);
    useEffect(() => {
        let start = ChessBoard.getStartPositions();
        start.boardBottom = ["Pa2", "Pb2", "Pc2", "Pd2", "Pe2", "Pf2", "Pg2", "Ph2", "Ra1", "Nb1", "Bc1", "Qd1", "Ke6", "Bf1", "Ng1", "Rh1"]
        boardController.setPieces(start.boardBottom, start.boardTop, 'white')
    }, [])
   

    return  {
        state : state,
        actions : boardController
    };
}