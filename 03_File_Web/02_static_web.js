//개별 item클릭시 내용 보여줌
var http=require('http');
var url = require('url');

// <a href=""> </a> --하이퍼링크로 
var html= `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Static Web2</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">Web 프로그래밍 기술</a></h1> 
        <h3><ul>
            <li><a href="/?title=HTML5">HTML5</a></li>
            <li><a href="/?title=CSS3">CSS3</a></li>
            <li><a href="/?title=Javascript">Javascript</a></li>
            </ul></h3>
            <hr>
            <p>웹(World Wide Web)의 개방성은 웹사이트나 온라인 애플리케이션을 제작하려는 사람들에게 많은 기회를 
        제공합니다. 하지만 그 사용 방법을 알아야 웹 기술을 잘 활용할 수 있습니다. 아래의 링크들을 확인하여 
        다양한 웹 기술을 배워보세요.</p>

    </body>
    </html>`;

var contents = [
    {title:"HTML5", desc:"HTML is...."},
    {title:"CSS3", desc:"CSS3 is...."},
    {title:"Javascript", desc:"Javascript is...."}
]

var app = http.createServer(function(req, res){
   // console.log(req.url); //-> /favicon.ico가 찍히는 것을 볼수 있다.

    var _url =req.url;
    var pathname =url.parse(_url, true).pathname;
    var queryData =url.parse(_url, true).query;
    //console.log(pathname,queryData);
    
    if(pathname==='/')
    {   
        if(queryData.title === undefined) //localhost:3000 
        //title은 위에 변수값 <li><a href="/?title=HTML5">HTML5</a></li>       
        {
            console.log("localhost:3000");
            res.writeHead(200);
            res.end(html);
        }
        else            // localhost:3000/?title=xxx
        {
            let title=queryData.title; //유저가 준 title 
            let desc;
            for(let content of contents)
            {
                if(content.title === title) //설정해 놓은 title과 유저가 준 title이 같은지 비교
                {
                    desc = content.desc;
                }
            }
            console.log(title, desc);
            console.log("localhost:3000/?title=xxx");
            // var html로 선언시 제대로 동작하지 않음
            let html= `   
            <!DOCTYPE html>
            <html>
            <head>
                <title>Static Web2</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">Web 프로그래밍 기술</a></h1> 
                <h3><ul>
                    <li><a href="/?title=HTML5">HTML5</a></li>
                    <li><a href="/?title=CSS3">CSS3</a></li>
                    <li><a href="/?title=Javascript">Javascript</a></li>
                    </ul></h3>
                    <hr>
                    <h2>${title}</h2>
                    <p>${desc}</p>
            </body>
            </html>`;
        
            res.writeHead(200);
            res.end(html);
        }
        
    }
    else if (pathname === '/favicon.ico')
    {
        
    }
    else
    {
        res.writeHead(404);
        res.end('Not found');
    }
    
    
});
app.listen(3000);