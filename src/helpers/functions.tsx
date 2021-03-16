export function fromLengthOf(num : number) : number[] {
    return Array.from(Array(num).keys());
}

export function fieldNotations() : string[] {

    const fieldLetters = ['a','b','c','d','e','f','g','h'];
    let notations : string[] = [];

    fieldLetters.forEach((val, i) => {
        fieldLetters.forEach((letter) => {
            notations.push(`${letter}${fieldLetters.length - i}`)
        })
    })
    
    return notations
}


