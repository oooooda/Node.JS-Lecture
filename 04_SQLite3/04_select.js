//DB접속
var sqlite3 = require('sqlite3').verbose(); 
var db = new sqlite3.Database("../../03_Sqlite/test.db");
var sql_ts = "SELECT id, title, writer,strftime('%m-%d %H:%M',timestamp, 'localtime') ts, content FROM bbs"; 
var singlesql="SELECT id, title, writer,strftime('%m-%d %H:%M',timestamp, 'localtime') ts, content FROM bbs where id=?";
var multisql="SELECT id, title, writer,strftime('%m-%d %H:%M',timestamp, 'localtime') ts, content FROM bbs where id>=?";

db.serialize(function() {
    //일괄 추출
    console.log('일괄 추출');
    db.all(sql_ts, function(err,rows){  
        for(let row of rows){
            console.log(row.id, row.title, row.writer, row.ts, row.content);
        }
    });

    //라인 단위 추출
    console.log('라인 단위 추출');
    db.each(sql_ts, function(err, row){
        console.log(row.id, row.title, row.writer, row.ts, row.content);
    });

    //단일 추출
    console.log('단일 추출');
    var timeSql="SELECT strftime('%m-%d %H:%M','now', 'localtime') ts";
    db.get(timeSql,function(err,row){
        console.log(row.ts);
    });

    //검색-단일 검색
    console.log('검색');
    var stmt = db.prepare(singlesql);
    stmt.get(102,function(err, row){
        console.log(row.id, row.title, row.writer, row.ts, row.content);
    });
    stmt.finalize();

    //검색 - 결과가 여러개
    console.log('검색');
    var stmt = db.prepare(multisql);
    stmt.all(101,function(err, rows){
        for(let row of rows){
            console.log(row.id, row.title, row.writer, row.ts, row.content);
        }
    });
    stmt.finalize();
});


//DB접속 해제
db.close();
