//입력을 받아서 e-mail 형식에 맞는지 여부를 알려주는 프로그램

var readline = require('readline');

var r = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

//e-mail 정규 표현식

var emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
r.question("e-mail 주소를 입력하세요.>",function(answer){
    let result=emailRegEx.test(answer);
    console.log(result);
    r.close();
});


 
