
var readline = require('readline');

var r = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

//e-mail 정규 표현식
var emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
//핸드폰 전화번호
var hpRegEx= /^\d{3}-\d{3,4}-\d{4}$/;
//패스워드 정규표현식, 숫자와 문자 포함 형태의 8~10자리 이내의 암호 정규식
var pwdRegEx =  /^[A-Za-z0-9]{6,12}$/;//숫자와 문자 포함 형태의 6~12자리 이내의 암호 정규식


r.setPrompt('> ');
r.prompt();
r.on('line',function(line){
    if(line === 'exit'){
        r.close();
    }
    if(emailRegEx.test(line)){
        console.log('email 표현식입니다.');
    }
    else if(hpRegEx.test(line)){
        console.log('전화번호 표현식입니다.');
    }
    else if(pwdlRegEx.test(line)){
        console.log('비밀번호 표현식입니다.');
    }
    else{
        console.log('다시 입력하세요.')
    }
    console.log(line);
    r.prompt()
});
r.on('close',function(){
    process.exit();
});