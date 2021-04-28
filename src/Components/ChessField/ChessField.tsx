import React, { ReactNode } from 'react';
import { ChessPiece } from '../../ts/classes/chess/chessPiece';
import { Board, BoardTable, ReducerObject } from '../../ts/globalTypes';
import {composeClasses} from '../../helpers/functions'
import './ChessField.scss'

interface ChessFieldProps {
    black : boolean,
    children : ReactNode | null,
    interact : () => void
    interactive : boolean[]
}


export default function ChessField(props : ChessFieldProps) {
    let { black, children, interact } = props;
    let [canMoveHere, canTakePiece] = props.interactive

    return (
        <div 
            className={composeClasses(
                'field',
                black && 'black',
                canMoveHere && 'hl-gold',
                canTakePiece && 'hl-red')}
            onClick = {interact}
            >
            {children}
        </div>  
    ) 
}


