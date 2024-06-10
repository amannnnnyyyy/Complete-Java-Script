export const formatCurrency=(price)=>
{
    return '$'+(price/100).toFixed(2);
}
const tax = 15/100;
export const taxCalc=(price)=>{
    price=Number(price.replace('$',''))
    return {total:'$'+(price - (price*tax)).toFixed(2),taxAmount:'$'+(tax*price).toFixed(2)}
}

