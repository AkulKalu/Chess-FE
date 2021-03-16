import React from 'react';
import ChessField  from '../ChessField/ChessField'
import {fieldNotations} from '../../helpers/functions';


export default function ChessBoard() {

    const fields = fieldNotations().map( (notation, i) => {
            return <ChessField key={notation} notation={notation}></ChessField>
        }
    )

    return <div className="max">
       <div className="max board">
            {fields}
       </div>
    </div>  
}