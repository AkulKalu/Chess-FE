
export function getStartPositions( positions : string[] ) : string[] {

    const start : string[] = positions.map( (pos, i) => {
     
        const rank : string = pos[1];
        const file : string  = pos[0];

        if( rank === '7' || rank === '2' ) {
            return `P${pos}`
            
        }else if ( rank === '8' || rank === '1') {
          
           
            let pieceAtFile : { [index : string] : string } = {
                a : 'R',
                b : 'N',
                c : 'B',
                d : 'Q',
                e : 'K',
                f : 'B',
                g : 'N',
                h : 'R' 
            }
            
            return `${pieceAtFile[file]}${pos}`
        }

        return pos
    })

    return start;
}

interface Board {
    [field : string] : any
}
export function createEmptyBoard( notations : string[] ) : Board {
    const board : Board = {};
    notations.forEach( notation => board[notation] = null )
    return board;
}

export function composeClasses(...clsArgs : any[]) : string {
    let classes =  clsArgs.filter(cls => typeof cls === 'string')
    return classes.join(' ');
}


export function checkFieldColor() : ( fieldIndex : number ) => boolean  {

    let shiftBlack: boolean = false;

    return (fieldIndex : number) => {
        if( fieldIndex!== 0 && fieldIndex % 8 === 0 ){
            shiftBlack = !shiftBlack;
        }

        return shiftBlack ? fieldIndex % 2 ===0 : fieldIndex % 2 > 0
    }
}


