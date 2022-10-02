export const hasSecuence = (text, N = 4) => {
    let max = N, 
        length = text.length,
        previousCharacter = text[0],
        consecutives = 1,
        currentCharacter;
          

    for (let i = 1; i < length; i++) {
        currentCharacter = text[i];
        if (nextCharacter(previousCharacter) === currentCharacter) {
            consecutives++;
            if (consecutives >= max) {
                // return text.substr(i - max + 1, max);
                return true;
            }
        } else {
            consecutives = 1;
        }
        previousCharacter = currentCharacter;
    }
    return false;
}

const nextCharacter = (c) => {
    if (c === 'z') return 'a';
    if (c === 'Z') return 'A';
    if (c === '9') return '0';
    return String.fromCodePoint(c.codePointAt() + 1);
}