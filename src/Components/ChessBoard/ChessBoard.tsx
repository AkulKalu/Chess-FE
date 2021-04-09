import React, { useContext, useState,  } from 'react';
import ChessField  from '../ChessField/ChessField'
import {checkFieldColor } from '../../helpers/functions';
import { store } from '../../HOC/State/Provider'
import ChessPiece from '../ChessPieces/ChessPiece';
import { ChessBoardNotation } from '../../ts/dataStructures/chess';
import { DataObject } from '../../ts/globalTypes';

const boardNotation = new ChessBoardNotation();
function assertFieldIsInteractive(field : string, fields : DataObject<string[][]> ) : boolean[] {
    let canMoveTo = fields.openFields.filter( line => line.includes(field) );
    let canTake = fields.opponentFields.filter( line => line.includes(field) );
    return [Boolean(canMoveTo.length), Boolean(canTake.length)];
}
export default function ChessBoard() {
    const [interactiveFields, setHighlight] = useState<DataObject<string[][]>>({
        openFields : [],
        opponentFields : []
    });
    
    const {board} = useContext(store);
    const setBlackField = checkFieldColor();
    const fields = boardNotation.getFieldNotations().map( (notation, i) => {
            let piece = board.state[notation]
            return <ChessField 
                    black = {setBlackField(i)}
                    interactive = {assertFieldIsInteractive(notation, interactiveFields)}   
                    key={notation} 
                    notation={notation}>
                        {piece &&  <ChessPiece callHighlight={setHighlight} onBoard = {board.actions} piece={piece} />}
                    </ChessField>
        }
    )

    return <div className="max">
       <div className="max board">
            {fields}
       </div>
    </div>  
}