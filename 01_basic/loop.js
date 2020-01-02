
//역 삼각형으로 별 그리기
/* for(let i=0;i<5;i++){
    for(let k=0;k<i;k++){
        process.stdout.write(' ');   
    }
    for(let z=1;z<=5-i;z++){
        process.stdout.write('*');
    }
    console.log();

} */

//다이아몬드 별 그리기
for(let i=0;i<4;i++){
    for(let k=3; k>i; k--){
        process.stdout.write(' ');   
    }
    for(let z=0; z<(i*2+1); z++){
        process.stdout.write('*');
    }
    console.log();
}
for(let i=0;i<3;i++){
        for(let k=0; k<=i; k++){
            
            process.stdout.write(' ');   
        }
        for(let z=3; z>=(i*2-1); z--){
            process.stdout.write('*');
        }
        console.log();

} 