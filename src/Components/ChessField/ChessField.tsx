import React from 'react';

interface ChessFieldProps {
    notation : string
}

export default function ChessField(props : ChessFieldProps) {


    return <div className="field">
        <span>{props.notation}</span>
    </div>  
}