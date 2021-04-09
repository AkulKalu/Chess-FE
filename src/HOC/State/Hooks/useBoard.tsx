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
        boardController.setPieces(start.boardBottom, start.boardTop)
    }, [])
   

    return  {
        state : state,
        actions : boardController
    };
}