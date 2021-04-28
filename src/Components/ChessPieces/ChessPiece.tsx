import Bishop from './Classic/Bishop';
import Rook from './Classic/Rook';
import Pawn from './Classic/Pawn';
import Knight from './Classic/Knight';
import King from './Classic/King';
import Queen from './Classic/Queen';
import { ChessPiece } from '../../ts/classes/chess/chessPiece';

interface ChessPieceProps {
    piece : ChessPiece,
    select : React.Dispatch<ChessPiece | null>
}

const pieces : {[key : string] : any} = {
    R : Rook  ,
    N : Knight  ,
    B : Bishop  ,
    Q : Queen  ,
    K : King  ,
    P : Pawn ,
} 

export default function ChessPieceCMP(props : ChessPieceProps) {
    const {piece, select} = props;
    const selectPiece = (e : any) => {
        e.stopPropagation();
        select(piece);
    }
    const enemy = () => {
        console.log(piece.isPlayer)
        return
    }
    const PieceSVG = pieces[props.piece.properties.type];
    return <div  onClick={piece.isPlayer ? selectPiece : enemy} className="max center">
        { <PieceSVG /> }
    </div>
}