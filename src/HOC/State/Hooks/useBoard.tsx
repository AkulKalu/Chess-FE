import { useEffect, useReducer } from 'react';
import { initialState, reducer } from '../../../reducers/board';
import { ChessBoard } from '../../../ts/classes/chess/board';
import { BoardDispatch } from '../../../ts/classes/controllers/boardController';





export default function useBoard() {
    const [state, dispatch] = useReducer( reducer, initialState );
    const boardController = new BoardDispatch(dispatch);
    useEffect(() => {
        let start = ChessBoard.getStartPositions();
        boardController.setPieces(start.boardBottom, start.boardTop)
    }, [])
   

    return  {
        state : state,
        actions : dispatch
    };
}