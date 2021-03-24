import React, { createContext, ReactNode } from 'react';
import useBoard from './Hooks/useBoard';

interface ProviderProps {
    children : ReactNode
}


type Context = {
    board : any
}

const store = createContext<Context>({board: null});


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