/* let product = {
    제품명 : '7D건조 망고',
    유형 : '당절임',
    성분 : '망고, 설탕, 메타중아황산나트륨, 치자황색소',
    원산지 : '필리핀'
};
 */
//출력

 let object = {
     name : '바나나',
     price : 1200
 };
 console.log(object.name);
 console.log(object.price);
 console.log(object);

for(let key in object){
    console.log(`${key}: ${object[key]}`);
}
for(let key in object){
    console.log(key,object[key]);
}
 