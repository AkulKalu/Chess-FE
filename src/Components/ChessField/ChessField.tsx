import React from 'react';

interface ChessFieldProps {
    notation : string,
    black : boolean
}

export default function ChessField(props : ChessFieldProps) {
    let {black, notation} = props;

    return <div style={black ? {background: 'black'} : {}} className="field">
        <span>{notation}</span>
    </div>  
}