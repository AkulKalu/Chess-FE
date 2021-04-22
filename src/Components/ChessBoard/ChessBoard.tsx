import React, { useContext, useState,  } from 'react';
import ChessField  from '../ChessField/ChessField'
import ChessPieceJSX from '../ChessPieces/ChessPiece';
import {checkFieldColor } from '../../helpers/functions';
import { store } from '../../HOC/State/Provider'
import { ChessBoardNotation } from '../../ts/dataStructures/chess';
import { ChessPiece } from '../../ts/classes/chess/chessPiece';
import { ChessBoardScaner } from '../../ts/classes/chess/boardScaner';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine';

const boardNotation = new ChessBoardNotation();

const game = new Game();
console.log(game.move('A2', 'A3'));

console.log(game.aiMove(2))
console.log(game);



export default function ChessBoard() {
    const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null);
    const {board} = useContext(store);
    const setBlackField = checkFieldColor();
    const playMaker = new ChessBoardScaner(board.state);
    playMaker.getPlaysForPiece(selectedPiece!);
    
    const fields = boardNotation.getFieldNotations().map( (field, i) => {
            let piece = board.state[field];
            return (
                <ChessField 
                    black = {setBlackField(i)}
                    interactive = {playMaker.assertFieldIsInteractive(field)}   
                    interact = {board}
                    selectedPiece = {selectedPiece}
                    key={field} 
                    notation={field}>
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