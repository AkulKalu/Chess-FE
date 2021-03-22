import React, { useEffect, useReducer } from 'react';
import { createEmptyBoard, getFieldNotations, getStartPositions } from '../../../helpers/functions';
import { initialState, reducer } from '../../../reducers/board';




export default function useBoard() {
    const [state, dispatch] = useReducer( reducer, initialState );
   
    useEffect(() => {
        
        // let newBoard = createEmptyBoard(getFieldNotations());
        // let piecesMap = getStartPositions(getFieldNotations());

        // piecesMap.forEach( position => {
        //     let hasChessPiece = position.length === 3;
        //     if( hasChessPiece ) {
        //        let pieceType = position[0];
        //        let field = position.slice(1);
        //        newBoard[field] = new Piece(pieceType, 'black', {state : state, actions : dispatch})
        //     }
        // } )

        // dispatch({
        //     type : 'NEW',
        //     payload : newBoard
        // })

    }, [])

    return  {
        state : state,
        actions : dispatch
    };
}