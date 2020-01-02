let now = new Date();

/* //2020-01-02(목) 13:23
console.log(now.getFullYear()); //2020
console.log(now.getMonth());    //0 -월의 경우 -1값으로 나온다. 현재 1월
console.log(now.getDate());     //2
console.log(now.getDay());      //4 -일요일이 0~ 토요일 6
console.log(now.getHours());     //13
console.log(now.getMinutes());  //23 */

//let currentHour = now.getHours();
let currentHour = 12;
if(currentHour >= 12){
    console.log('PM' + (currentHour-12) + 'h');

}
else{
    console.log('AM' +currentHour +'h');
}


if(currentHour >= 12){
    console.log(`PM ${currentHour-12}h`);

}
else{
    console.log(`AM ${currentHour-12}h`);
}

let apm = '오전';
if(currentHour >=12){
    apm = '오후';
    if(currentHour >=13){
        currentHour -=12;
    }
    console.log(`${apm} ${currentHour}시`);
}

apm = currentHour >=12? '오후':'오전';
currentHour = currentHour >= 13? currentHour-12 : currentHour;
console.log(`${apm} ${currentHour}시`);