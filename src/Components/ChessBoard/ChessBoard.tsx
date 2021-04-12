import React, { useContext, useState,  } from 'react';
import ChessField  from '../ChessField/ChessField'
import {checkFieldColor } from '../../helpers/functions';
import { store } from '../../HOC/State/Provider'
import ChessPieceJSX from '../ChessPieces/ChessPiece';
import { ChessBoardNotation } from '../../ts/dataStructures/chess';
import { DataObject } from '../../ts/globalTypes';
import { ChessPiece } from '../../ts/classes/chess/chessPiece';
import { ChessBoardScaner } from '../../ts/classes/chess/boardScaner';

const boardNotation = new ChessBoardNotation();
function assertFieldIsInteractive(field : string, fields : DataObject<string[][]> | undefined ) : boolean[] {
    if(fields) {
        let canMoveTo = fields.openFields.filter( line => line.includes(field) );
        let canTake = fields.opponentFields.filter( line => line.includes(field) );
        return [Boolean(canMoveTo.length), Boolean(canTake.length)];
    }
    return [false, false];
}
export default function ChessBoard() {
    const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null);
    const {board} = useContext(store);
    const setBlackField = checkFieldColor();
    const playMaker = new ChessBoardScaner(board.state);
    const interactiveFields = playMaker.getPlaysForPiece(selectedPiece);
    
    const fields = boardNotation.getFieldNotations().map( (field, i) => {
            let piece = board.state[field];
            return <ChessField 
                    black = {setBlackField(i)}
                    interactive = {assertFieldIsInteractive(field, interactiveFields)}   
                    interact = {board}
                    selectedPiece = {selectedPiece}
                    key={field} 
                    notation={field}>
                        {piece &&  <ChessPieceJSX select={setSelectedPiece} piece={piece} />}
                    </ChessField>
        }
    )

    return <div className="max">
       <div className="max board">
            {fields}
       </div>
    </div>  
}