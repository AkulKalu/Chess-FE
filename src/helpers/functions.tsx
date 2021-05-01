
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


