//함수 선언
function callThreeTime(callback){
    if(callback){
        for(let i=0;i<3;i++){
            callback();
        }
    }else {
        console.log('No callback!!!');
    }
}

//정상 실행
callThreeTime(function(){
    console.log('안녕하세요');
});

//예외발생
callThreeTime();