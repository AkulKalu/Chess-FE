import React, { ReactNode } from 'react';
import './ChessField.scss'

interface ChessFieldProps {
    notation : string,
    black : boolean,
    children : ReactNode | null,
    interactive : boolean[]
}
function composeClasses(...clsArgs : any[]) : string {
    let classes =  clsArgs.filter(cls => typeof cls === 'string')
    return classes.join(' ');
}
export default function ChessField(props : ChessFieldProps) {
    let {black, children} = props;
    let [canMoveHere, canTakePiece] = props.interactive;

   
    return (
        <div 
        className={composeClasses(
            'field', 
            black && 'black', 
            canMoveHere && 'hl-gold',
            canTakePiece && 'hl-red'
        )}>
            {children}
        </div>  
    ) 
}