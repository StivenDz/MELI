export const usePriceFormat = (number) =>{
    number = (number.toString()).split('');
    number.reverse();
    if(number.length > 3){
        let count = 0;
        for (let i = 0; i <  number.length; i++) {
            if(count == 3){
                number.splice(i,0,'.')
                count = 0;
            }else{
                count++;
            }
        }
    }

    number.reverse();
    number.join(',');
    return number;
}