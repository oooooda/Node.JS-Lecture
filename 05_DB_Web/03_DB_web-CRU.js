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
var insertSql=`INSERT INTO bbs (title, writer, content) VALUES(?,?,?)`; // 새로운 내용을 추가하기위한 선언
var updateSql = `UPDATE bbs SET title=?, writer=?, timestamp=datetime('now'), content=? WHERE id=?`;
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
                    trs += template.tableMain(row);
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
                
                //데이터를 읽어온다
                stmt = db.prepare(searchSql);
                stmt.get(idVal,function(err, row){
                    let trs = template.tableItem(row);
                    let view = require('./View/itemView');
                    let html=view.itemView(navBar,trs)
                    res.writeHead(200);
                    res.end(html);
                });
                stmt.finalize();  
            });    
        }
    }
     //입력화면 생성
     else if (pathname === '/create')
     {
        let navBar=template.navOp();
        let view=require('./view/create');
        let html= view.create(navBar);
        res.writeHead(200);
        res.end(html); 
     }
     else if (pathname === '/create_proc')
     {
         var body='';
         //데이터가 오는 중
         req.on('data',function(data){ 
             body +=data;
         });
         //데이터가 끝나 end가 옴
         req.on('end',function(){
             let post =qs.parse(body);
             let title=post.title;   //title로 입력된 내용
             let writer=post.writer;     //글쓴이로 입력된 내용
             let content=post.content;   //내용으로 입려된 내용
             
             //DB에 저장하기
             var stmt = db.prepare(insertSql);
             stmt.run(title, writer,content);
             stmt.finalize();
           
            res.writeHead(302,{Location: `/`});  //저장 후 방금 저장된 title로 이동됨.
            res.end();

         });
     }
     //글 수정하기 화면
     else if (pathname === '/update')
     {      
         let idVal=parseInt(queryData.id);
         let navBar=template.navOp();

         let stmt = db.prepare(searchSql);
         stmt.get(idVal,function(err, row){
                let view = require('./View/update');
                let html=view.update(navBar,row)
                res.writeHead(200);
                res.end(html);
            });
            stmt.finalize();
     }
     else if (pathname === '/update_proc')
     {
         var body='';
         //데이터가 오는 중
         req.on('data',function(data){ 
             body +=data;
         });
         //데이터가 끝나 end가 옴
         req.on('end',function(){
             let post =qs.parse(body);
             let idVal=parseInt(post.id); //title수정을 위해 hidden title을 입력 받음.
             let title=post.title;   //title로 입력된 내용
             let writer=post.writer;     //내용으로 입려된 내용
             let content=post.content;

             let stmt = db.prepare(updateSql);
             stmt.run(title,writer,content,idVal);
             stmt.finalize();
            res.writeHead(302,{Location: `/?id=${idVal}`});  //저장 후 방금 저장된 title로 이동됨.
            res.end();
         });   
     }
     else if (pathname === '/delete')
     {
         fs.readdir('./data', function(err, files) {
             let list=template.List(files);
             let navBar=template.navOp();
             let title=queryData.title; //유저가 선택한 title
             let view = require('./view/delete');
             let html=view.delete(list, navBar,title);
                 
                 res.writeHead(200);
                 res.end(html);
         });
     }
     else if (pathname === '/delete_proc')
     {
         var body='';
         req.on('data',function(data){ 
         body +=data;
         });
         req.on('end',function(){
             let post =qs.parse(body);
             let title=post.title;   //title로 입력된 내용
             // title 삭제
             fs.unlink(`./data/${title}.txt`,function(err){
             res.writeHead(302,{Location: `/`});  //홈으로 이동
             res.end();  
             }); 
         });
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