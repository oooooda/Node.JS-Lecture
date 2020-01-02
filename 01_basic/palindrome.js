let a =100;
let b=100;
var num;

for(let i=100;i<999;i++){
  
    for(let k=100;k<999;k++){
        
        num=a*b;
        isPalindrome(num);
        //isPalindrome(num);
        b++
    }
    a++;
}

function isPalindrome(num){

    let nstr1=String(num).split("");
    let nstr2=String(num).split("").reverse();
    return nstr1===nstr2 ? true:false;

}