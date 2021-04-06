import React from 'react';
import Bishop from './Classic/Bishop';
import Rook from './Classic/Rook';
import Pawn from './Classic/Pawn';
import Knight from './Classic/Knight';
import King from './Classic/King';
import Queen from './Classic/Queen';
import { Piece } from '../../ts/globalTypes';

interface ChessPieceProps {
    piece : Piece 
}

export default function ChessPiece(props : ChessPieceProps) {
    const pieces : {[key : string] : any} = {
        R : Rook  ,
        N : Knight  ,
        B : Bishop  ,
        Q : Queen  ,
        K : King  ,
        P : Pawn ,
    } 
    const Piece = pieces[props.piece.properties.type]
    return <div className="max center">
        { <Piece /> }
    </div>
}