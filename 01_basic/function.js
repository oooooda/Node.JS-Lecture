let add = function(a, b){   //익명 함수(c 와 다르게 함수의 이름이 존재하지 않음)
    return a+b;
}

function add2(a,b){
    return a+b;
}

let add3 = (a,b) => {
    console.log("add3 함수입니다.")
    return a+b;
}
let add4 = (a,b) => (a+b)
console.log(add(3,4));
console.log(add2(3,4));
console.log(add4(3,4));
add3();