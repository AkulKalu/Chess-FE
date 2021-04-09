import React from 'react';
import Bishop from './Classic/Bishop';
import Rook from './Classic/Rook';
import Pawn from './Classic/Pawn';
import Knight from './Classic/Knight';
import King from './Classic/King';
import Queen from './Classic/Queen';
import { Board, DataObject } from '../../ts/globalTypes';
import { ChessPiece } from '../../ts/classes/chess/chessPiece';

interface ChessPieceProps {
    piece : ChessPiece,
    onBoard : Board | null,
    callHighlight : React.Dispatch<DataObject<string[][]>>
}

const pieces : {[key : string] : any} = {
    R : Rook  ,
    N : Knight  ,
    B : Bishop  ,
    Q : Queen  ,
    K : King  ,
    P : Pawn ,
} 

export default function ChessPieceEl(props : ChessPieceProps) {
    const {piece, onBoard, callHighlight} = props;
    const highlightInteractiveFields = () => {
        callHighlight(piece.getInteractiveFields());
    }
    const PieceSVG = pieces[props.piece.properties.type];
    return <div onClick={highlightInteractiveFields} className="max center">
        { <PieceSVG /> }
    </div>
}