import React, { useContext, useState,  } from 'react';
import ChessField  from '../ChessField/ChessField'
import ChessPieceJSX from '../ChessPieces/ChessPiece';
import {checkFieldColor } from '../../helpers/functions';
import {useSelector, useDispatch} from 'react-redux'
import {boardSelector} from '../../app/boardSlice'
import { ChessBoardNotation } from '../../ts/dataStructures/chess';
import { ChessPiece } from '../../ts/classes/chess/chessPiece';
import { ChessBoardScaner } from '../../ts/classes/chess/boardScaner';
import {ChessPieceFactory} from "../../ts/factories/ChessPiece";


const boardNotation = new ChessBoardNotation();
const pieceFactory = new  ChessPieceFactory()


export default function ChessBoard() {
    const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null);
    const board = useSelector(boardSelector)
    const setBlackField = checkFieldColor();
    const playMaker = new ChessBoardScaner(board);
    playMaker.getPlaysForPiece(selectedPiece!);

    const setFieldInteractivity = ( field : string, interactivity : boolean[] ) => {
        let [move, take] =  interactivity;
        if(move) {
            return () => {
                board.actions.movePiece(selectedPiece!, field);
                setSelectedPiece(null);
            }
        }else if(take) {
            return () => {
                board.actions.pieceTakesPiece(selectedPiece!, board.state[field]);
                setSelectedPiece(null);
            }
        }
        return () => {
            if(selectedPiece) {
                setSelectedPiece(null);
            }
        }
    }
    
    const fields = boardNotation.getFieldNotations().map( (field, i) => {
            let piece = board[field] && pieceFactory.createPiece(board[field]!)
            let interactivity = playMaker.assertFieldIsInteractive(field)
            return (
                <ChessField 
                    black = {setBlackField(i)}
                    interact={setFieldInteractivity(field, interactivity)}
                    interactive ={interactivity}
                    key={field} >
                        {piece &&  <ChessPieceJSX select={setSelectedPiece} piece={piece} />}
                </ChessField>
            ) 
        }
    )

    return (
        <div className="max">
            <div className="max board">
                {fields}
            </div>
        </div> 
    )  
}