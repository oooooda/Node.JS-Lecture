//외부로 내보낼 때는 JSON형태로 내보낸다.
//받을 때는 JSON.parse를 하면 된다

const jsObject = [
    { name: '윤인성', region: '서울'},
    { name: '윤명월', region: '도쿄'}
];

let outputA = JSON.stringify(jsObject); 
let outputB = JSON.stringify(jsObject,null,2);
console.log(typeof(outputA));
console.log(outputA);
console.log(outputB);
console.log('-----------------------------------');

let outputC=JSON.parse(outputB); //A,B둘다 동일한 결과가 출력
console.log(typeof(outputC));
console.log(outputC);