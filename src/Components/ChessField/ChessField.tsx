import React, { ReactNode } from 'react';
import './ChessField.scss'

interface ChessFieldProps {
    notation : string,
    black : boolean,
    children : ReactNode | null
}

export default function ChessField(props : ChessFieldProps) {
    let {black, children} = props;

    return <div className={black ? "field black" : "field"}>
        {children}
    </div>  
}