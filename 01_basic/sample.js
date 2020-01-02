console.log(Math.min(1,2)); // Method
console.log(Math.PI); // Attribute

var strikeOut=true; //변수
const PI =3.14;
function myMin(a,b)
{
    return a>b? b:a;
}

let a=10;
let b=20;
console.log(Math.min(a,b));
console.log(myMin(a,b)); 

//console.log("This is "string""); //실행 안됨
console.log("This is \"string\"");
console.log('This is "string"');

console.log("Hi,\nJavascript"); // 줄바꿈 \n

function makeTableRow01(a,b,c){
    var row = `<tr><td>${a}<\td><td>${b}<\td><td>${c}<\td><td>`;
    old ='<tr><td>'+a+'<\td><td>'+b+'<\td><td>'+c+'<\td><td>';
    console.log(old);
    return row;
}

console.log(makeTableRow01('aaa','bbb','ccc'));

if(old === makeTableRow01('aaa','bbb','ccc')){
    console.log("같습니다.");
}