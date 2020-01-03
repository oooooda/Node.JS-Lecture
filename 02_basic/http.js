/* var http=require('http');

var app = http.createServer(function(request, response){
    response.writeHead(200);
    response.end(`<h1>hello</h1>`);

});
app.listen(3000); */

var http=require('http');

function alertMsg(msg, url){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <tittle>Alert and Prompt</tittle>
            <meta charset="utf-8">
            <script>
               // var input = prompt('글자를 입력해 주세요','힌트');
                alert(${msg};
                location.href=${url};
            </script>
        </head>
        <body>
            <h3>경고메세지를 띄워줌</h3>
        </body>
    </html>
    `;
}
var app = http.createServer(function(request, response){
    console.log(request.url);
    response.writeHead(200);
    let alert = alertMsg("경고창에 뜨는 메세지","https://www.naver.com");
    response.end(alert);

});
app.listen(3000);

