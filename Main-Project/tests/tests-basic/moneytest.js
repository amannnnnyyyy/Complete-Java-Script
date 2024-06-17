import { formatCurrency } from "../script/utils/money.js";
console.log("test suite: formatCurrency")
//Basic test case
console.log("test basic functionality")
if(formatCurrency(1565)==='$15.65'){
    console.log("passed")
}else{
    console.log("failed")
}


// Edge cases
console.log("work with zero")
if(formatCurrency(0)==='$0.00'){
    console.log("passed")
}else{
    console.log("failed")
}


console.log("work with round up")
if(formatCurrency(2000.5)==='$20.01'){
    console.log("passed")
}else{
    console.log("failed")
}


console.log("work with round down")
if(formatCurrency(2000.4)==='$20.00'){
    console.log("passed")
}else{
    console.log("failed")
}