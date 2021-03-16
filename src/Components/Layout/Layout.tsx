import React from 'react';
import ChessBoard from '../ChessBoard/ChessBoard'


export default function Layout() {


    return <div className="max-port">
        <div className='max center'>
            <div style={{height: '70vh', width: '70vh'}}>
                <ChessBoard />
            </div>
           
        </div>
    </div>  
}