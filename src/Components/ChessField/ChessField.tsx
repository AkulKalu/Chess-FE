import React, { ReactNode } from 'react';
import { ChessPiece } from '../../ts/classes/chess/chessPiece';
import { Board, BoardTable, ReducerObject } from '../../ts/globalTypes';
import {composeClasses} from '../../helpers/functions'
import './ChessField.scss'

interface ChessFieldProps {
    notation : string,
    black : boolean,
    children : ReactNode | null,
    interactive : boolean[],
    interact : ReducerObject<BoardTable, Board >
    selectedPiece : ChessPiece | null
}


export default function ChessField(props : ChessFieldProps) {
    let {notation, black, children, selectedPiece, interact : onBoard } = props;
    let [canMoveHere, canTakePiece] = props.interactive;
 
    const makeMove = () => {
        if(canMoveHere) {
            onBoard.actions.movePiece(selectedPiece!, notation);
        }else if(canTakePiece) {
            onBoard.actions.pieceTakesPiece(selectedPiece!, onBoard.state[notation]!);
        }
    }

    return (
        <div 
        className={composeClasses(
            'field', 
            black && 'black', 
            canMoveHere && 'hl-gold',
            canTakePiece && 'hl-red')}
        onClick = {selectedPiece! && makeMove}
        >
            {children}
        </div>  
    ) 
}


