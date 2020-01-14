////
var http=require('http');
var url = require('url');           
var qs = require('querystring');    //글쓰기 입력 받기 위함.
var express = require('express')
var sqlite3 = require('sqlite3').verbose();
var bodyParser=require('body-parser'); //3rd party middleware로 프로그램 안에 사용되는 모듈(post가 간단해 진다.)
var template=require('./view/template');
const apiKey='a3922b175b8e68284bc508e2b1b63495';
const apiURI='http://api.openweathermap.org/data/2.5/weather?q=Yongin,kr&units=metric&appid=';

var request = require('request');
var weatherURI=apiURI + apiKey;

var ListSql = "SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs";
var searchSql = "SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?";
var incHSql=`update bbs set hit = (select hit from bbs where id=?)+1 where id =?;`; //hit수 증가하기 위해 선언
var insertSql=`INSERT INTO bbs (title, userId, content) VALUES(?,?,?)`; // 새로운 내용을 추가하기위한 선언
var updateSql = `UPDATE bbs SET title=?, userId=?, timestamp=datetime('now'), content=? WHERE id=?`;
var deleteSql=`DELETE FROM bbs WHERE id=?`;
var db = new sqlite3.Database("db/bbs.db");

const app = express(); //express라는 객체를 만듬
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.get('/',function(req,res){
    request(weatherURI,function(error,response,data){
        if(error){
            throw error;
        }
        var result = JSON.parse(data);
        let navBar=template.navMain(result); 
        let trs='';
        db.all(ListSql, function(err, rows){
            for(let row of rows){
                trs += template.tableMain(row);
            }
            let view=require('./view/index');
            let html=view.index(navBar,trs);
            res.send(html);    
                                                                                                                                                                                            
    });

    });
});
app.get('/id/:id',function(req,res){
   
    let idVal=parseInt(req.params.id); //유저가 선택한 title
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
            res.send(html);
        });
        stmt.finalize();  
    });    
});
app.get('/create',function(req,res){
    
    let navBar=template.navOp();
    let view=require('./view/create');
    let html= view.create(navBar);
    res.send(html);

});

app.post('/create',function(req,res){
    
    //let post =req.body; 
    let title=req.body.title;   
    let userId=req.body.userId;     
    let content=req.body.content;   
    var stmt = db.prepare(insertSql);
    stmt.run(title, userId,content);
    stmt.finalize();
    res.redirect('/');
});

app.get('/update/:id',function(req,res){
    
    let idVal=parseInt(req.params.id);
    let navBar=template.navOp();

    let stmt = db.prepare(searchSql);
    stmt.get(idVal,function(err, row){
        let view = require('./View/update');
        let html=view.update(navBar,row)
        res.send(html);
    });
    stmt.finalize();
});

app.post('/update',function(req,res){
    
              
    let idVal=parseInt(req.body.id); //title수정을 위해 hidden title을 입력 받음.
    let title=req.body.title;   
    let userId=req.body.userId;     
    let content=req.body.content;  

    let stmt = db.prepare(updateSql);
    stmt.run(title,userId,content,idVal);
    stmt.finalize();
    res.redirect(`/id/${idVal}`);

});

app.get('/delete/:id',function(req,res){
    
    let idVal=parseInt(req.params.id);
    let navBar=template.navOp();

    let stmt = db.prepare(searchSql);
    stmt.get(idVal,function(err, row){
        let view = require('./View/delete');
        let html=view.delete(navBar,row)
        res.send(html);
    });
    stmt.finalize();
});

app.post('/delete',function(req,res){
    
    let idVal=parseInt(req.body.id); //title수정을 위해 hidden title을 입력 받음.
    let stmt = db.prepare(deleteSql);
    stmt.run(idVal);
    stmt.finalize();
    res.redirect('/');

});
app.get('*',function(req, res){
    res.status(404).send('File not found');
});
app.listen(3000);

