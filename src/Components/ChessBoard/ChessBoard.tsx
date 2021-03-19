import React, { useContext  } from 'react';
import ChessField  from '../ChessField/ChessField'
import {checkFieldColor, getFieldNotations} from '../../helpers/functions';
import { store } from '../../HOC/State/Provider'




export default function ChessBoard() {

    const {board} = useContext(store);
    console.log(board);
    
    const setBlackField = checkFieldColor();
    
    const fields = getFieldNotations().map( (notation, i) => {
            return <ChessField black = {setBlackField(i)}   key={notation} notation={notation}></ChessField>
        }
    )

    return <div className="max">
       <div className="max board">
            {fields}
       </div>
    </div>  
}