//시간 더하기 100일
//현재 시간을 구합니다.
let now=new Date();

now.setDate(now.getDate() +100);
console.log(now.toString());
console.log(now.toLocaleString()); //우리나라 현재 시간을 알수 있다.
console.log(now.toLocaleDateString());
console.log(now.toLocaleTimeString());

now=new Date();
//let dDay=new Date('November 15,2021');
let dDay =new Date('2020-11-15'); //d-day 날짜
let interval=dDay.getTime()-now.getTime();
// 밀리 sec 단위이기 때문에 곱해줌
interval=Math.floor(interval/(1000*60*60*24));
 
console.log(`수능 D-${interval}`);
