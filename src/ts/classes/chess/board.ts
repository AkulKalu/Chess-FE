import {ChessBoardNotation, ChessPieceProperties} from "../../dataStructures/chess";
import {BoardTable, PieceData} from "../../globalTypes";

function movePiece(piece : PieceData, position : string, board : BoardTable) {
    board[piece.position] = null;
    piece.position = position;
    board[position] = piece;
}

function takePiece(piece : PieceData, taken : PieceData, board : BoardTable) {
    board[piece.position] = null;
    piece.position = taken.position;
    board[taken.position] = piece;
    return taken
}

function setPiece(piece : PieceData, board : BoardTable) {
    board[piece.position] = piece
    return board
}

function setPieces(pieces : {white : string[], black : string[]},player : string, board : BoardTable )  {
    pieces.white.forEach(piece => {
        setPiece(ChessPieceProperties.dataFromNotation(piece, 'white', player === 'white'), board)
    })
    pieces.black.forEach(piece => {
        setPiece(ChessPieceProperties.dataFromNotation(piece, 'black', player === 'white'), board);
    })
}

function createBoardTable() : BoardTable {
    let notations = new ChessBoardNotation();
    return notations.getFieldNotations().reduce<BoardTable>( (board, field) => {
        board[field] = null;
        return board
    } , {})
}

function getStartPositions() : { boardTop : string[], boardBottom : string[]} {
    return {
        boardTop :  ["Ra8", "Nb8", "Bc8", "Qd8", "Ke8", "Bf8", "Ng8", "Rh8", "Pa7", "Pb7", "Pc7", "Pd7", "Pe7", "Pf7", "Pg7", "Ph7"],
        boardBottom : ["Pa2", "Pb2", "Pc2", "Pd2", "Pe2", "Pf2", "Pg2", "Ph2", "Ra1", "Nb1", "Bc1", "Qd1", "Ke1", "Bf1", "Ng1", "Rh1"],
    }
}

export {movePiece, takePiece, setPiece, setPieces, createBoardTable, getStartPositions}
