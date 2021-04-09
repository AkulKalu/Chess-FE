import React, { createContext, ReactNode } from 'react';
import { Board, BoardTable, ReducerObject } from '../../ts/globalTypes';
import useBoard from './Hooks/useBoard';

interface ProviderProps {
    children : ReactNode
}


interface Context {
    board : ReducerObject<BoardTable, Board>
}

const store = createContext<Context>({board: {state : {}, actions : null}});


function Provider( { children } : ProviderProps ) {
    const board = useBoard();
    
    const globalState  = {
       board : board
    } 
    return <store.Provider value={globalState}>
        {children}
    </store.Provider>
}

export {store, Provider}