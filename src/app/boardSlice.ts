import { createSlice } from '@reduxjs/toolkit'
import {ChessBoard} from "../ts/classes/chess/board"

export const boardSlice = createSlice({
    name : 'board',
    initialState : ChessBoard.createBoardTable(),
    reducers : {
        movePiece : (state, action) => {
            const chessBoard = new ChessBoard(state)
        },
        pieceTakesPiece : (state, action) => {

        },
        setPieces : (state, action) => {

        }
    }
})

export const { movePiece, pieceTakesPiece, setPieces } = boardSlice.actions
export default boardSlice.reducer