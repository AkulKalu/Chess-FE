import React, { useContext  } from 'react';
import ChessField  from '../ChessField/ChessField'
import {checkFieldColor, getFieldNotations} from '../../helpers/functions';
import { store } from '../../HOC/State/Provider'
import ChessPiece from '../ChessPieces/ChessPiece';




export default function ChessBoard() {
    const {board} = useContext(store);
    const setBlackField = checkFieldColor();
    const fields = getFieldNotations().map( (notation, i) => {
            let piece = board.state[notation]
            return <ChessField 
                    black = {setBlackField(i)}   
                    key={notation} 
                    notation={notation}>
                        {piece &&  <ChessPiece piece={piece} />}
                    </ChessField>
        }
    )

    return <div className="max">
       <div className="max board">
            {fields}
       </div>
    </div>  
}