/* // 1초 후에
setTimeout(function(){
    console.log("1초가 경과");
}, 1000); */

// 1초 마다
let id=setInterval(function(){
    console.log("1초마다 호출");
}, 1000);

setTimeout(function() {
    //타이머를 제거합니다.
    clearInterval(id);
}, 5500);