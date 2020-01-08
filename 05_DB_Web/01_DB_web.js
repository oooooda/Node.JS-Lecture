////
var http=require('http');
var url = require('url');
var fs =require('fs');              //데이터를 파일로 부터 읽고 추가하기 위함.
var qs = require('querystring');    //글쓰기 입력 받기 위함.
var sqlite3 = require('sqlite3').verbose();
var template=require('./view/template');

var ListSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs";
var searchSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?";
var incHSql=`update bbs set hit = (select hit from bbs where id=?)+1 where id =?;`; //hit수 증가하기 위해 선언
var db = new sqlite3.Database("db/bbs.db");

var app = http.createServer(function(req, res){
   // console.log(req.url); //-> /favicon.ico가 찍히는 것을 볼수 있다.

    var _url =req.url;
    var pathname =url.parse(_url, true).pathname;
    var queryData =url.parse(_url, true).query;
    //console.log(pathname,queryData);
    
    if(pathname==='/')
    {   
        if(queryData.id === undefined) //localhost:3000 
        //title은 위에 변수값 <li><a href="/?title=HTML5">HTML5</a></li>       
        {  
            let navBar=template.navMain(); 
            let trs='';
            db.all(ListSql, function(err, rows){
                for(let row of rows){
                    trs += `<tr>
                    <td>${row.id}</td>
                    <td style="text-align: left;"><a href="/?id=${row.id}">${row.title}</a></td>
                    <td>${row.writer}</td>
                    <td>${row.ts}</td>
                    <td style="text-align: right;">${row.hit}</td>
                    </tr>`;
                }
                let html=template.Html(navBar,trs);
                res.writeHead(200);
                res.end(html);
            });
            
        }
        else            // localhost:3000/?id=101

        {
            let idVal=parseInt(queryData.id); //유저가 선택한 title
            let navBar=template.navList(idVal);  

            db.serialize(function() {
                var stmt = db.prepare(incHSql);
                stmt.run(idVal, idVal);
                stmt.finalize();
                
                stmt = db.prepare(searchSql);
                stmt.get(idVal,function(err, row){
                    let trs = `
                    <tr><td>ID</td><td>${row.id}</td></tr>
                    <tr><td>제목</td><td>${row.title}</td></tr>
                    <tr><td>글쓴이</td><td>${row.writer}</td></tr>
                    <tr><td>최종 수정 시간</td><td>${row.ts}</td></tr>
                    <tr><td>조회수</td><td>${row.hit}</td></tr>
                    <tr><td>내용</td><td>${row.content}</td></tr>`;
                    let view = require('./View/itemView');
                    let html=view.itemView(navBar,trs)
                    res.writeHead(200);
                    res.end(html);
                });
                stmt.finalize();  
            });    
        }
    }

    else if (pathname === '/favicon.ico')
    {
        fs.readFile('nodejs.png', function(err, data) {
            res.statusCode=200;
            res.setHeader('Content-type','image/png');
            res.end(data);
        });
    }
    else
    {
        res.writeHead(404);
        res.end('Not found');
    }    
});
app.listen(3000);