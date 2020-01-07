//DB접속
var sqlite3 = require('sqlite3').verbose(); 
var db = new sqlite3.Database("../../03_Sqlite/test.db");


////////////DB에 데이터 추가하기 1/////////
/* 
var sql = "INSERT INTO bbs3(id, title, writer, content)";
sql +="VALUES(101, 'a', 'b', 'c')";
db.run(sql);
//DB접속 해제
db.close();
 */

//////////DB에 데이터 추가하기2///////////
/* 
sql = 'INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)';

var title = 'About SQLite3';
var writer = 'Node.js';
var content = 'A quick brown fox jumps over the lazy dog.'; 

db.serialize(function() {
    
    stmt.run(title, writer, content);
    stmt.finalize();

    db.each("SELECT * FROM bbs", function(err, row) {
        console.log(row.id, row.title, row.writer, row.timestamp, row.content);
    });
});
//DB접속 해제
db.close();
*/

////////////Array/Object를 이용한 데이터 추가///////////////
sql = 'INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)';

var records = [
    {title:'title 1', writer: 'writet 1', coontent : 'content 1'},
    {title:'title 2', writer: 'writet 2', coontent : 'content 2'}
];

db.serialize(function() {
    var stmt = db.prepare(sql);
    for(let record of records){
        stmt.run(record.title, record.writer, record.content);
    }
    //stmt.run(title, writer, content);
    stmt.finalize();

    //표준시간을 바꿔주기 위해 vaq sql_ts추가, datatime으 값을 ts로 설정
    //yyyy-mm-dd hh:mm:ss형식
    //var sql_ts = "SELECT id, title, writer,datetime(timestamp, 'localtime') ts, content FROM bbs"; 
    //yyyymmddhhmmss형식
    var sql_ts = "SELECT id, title, writer,strftime('%Y%m%d%H%M',timestamp, 'localtime') ts, content FROM bbs"; 
    db.each(sql_ts, function(err, row) {
        console.log(row.id, row.title, row.writer, row.ts, row.content);//rew.dattime이 아닌 row.ts로 변경
    });
});





//DB접속 해제
db.close();
