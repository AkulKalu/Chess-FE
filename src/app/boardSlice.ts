import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as board from '../ts/classes/chess/board'
import {BoardTable} from "../ts/globalTypes";

export const boardSlice = createSlice({
    name : 'board',
    initialState : board.createBoardTable(),
    reducers : {
        movePiece : (state, action : PayloadAction<any[]>) => {
            let [piece, position] = action.payload
            board.movePiece(piece, position, state)
        },
        pieceTakesPiece : (state, action : PayloadAction<any[]>) => {
            let [piece, taken] = action.payload
            board.takePiece(piece, taken, state)
        },
        setPieces : (state, action) => {
            let [pieces, player] = action.payload
            board.setPieces(pieces, player, state)
        }
    }
})
export const boardSelector = (state : BoardTable) => state
export const { movePiece, pieceTakesPiece, setPieces } = boardSlice.actions
export default boardSlice.reducer