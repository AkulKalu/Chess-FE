import React, { useEffect, useReducer } from 'react';
import { initialState, reducer } from '../../../reducers/board';
import { BoardDispatch, ChessPiece } from '../../../ts/classes';




export default function useBoard() {
    const [state, dispatch] = useReducer( reducer, initialState );
    const boardController = new BoardDispatch(dispatch);
    useEffect(() => {
        let start = ChessPiece.getStartPositions();
        boardController.setPieces(start.boardBottom, start.boardTop)
    }, [])
   

    return  {
        state : state,
        actions : dispatch
    };
}