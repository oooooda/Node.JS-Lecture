var fs = require('fs');

//files에는 해당 파일에 대한 리스트가 담겨있다
fs.readdir('./data',function(err, files){
    var list = '</u>'
    for(let file of files)
    {
        console.log(file); //data 파일에 있는 txt파일들의 이름이 출력

        //list +=`<li>${file}</li>`;
        //출력 </u><li>CSS3.txt</li><li>HTML5.txt</li><li>Javascript.txt</li></ul> 
        
        //.txt를 없애서 출력하기 위해 substring 사용
        //list +=`<li>${file.substring(0,file.length-4)}</li>`; 
        //출력 </u><li>CSS3</li><li>HTML5</li><li>Javascript</li></ul> 

        let item =file.substring(0,file.length-4)
        list +=`<li><a href="/?title=${item}">${item}</a></li>\n`;

    }
    list +='</ul>';
    console.log(list);
    
    //.txt를 없애기 위해서는 길이를 구해서
});