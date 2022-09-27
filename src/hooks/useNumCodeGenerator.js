/**
 * 
 * @param {number} length 
 * @returns {string}
 */
export const generateCode = (length = 4) =>{
    let nums = [];
    for (let i = 0; i < length; i++) {
        nums.push(Math.floor(Math.random() * 10))
    }
    return nums.join("");
}