module.exports.create = function(navBar){
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Espress Web</title>
            <meta charset="utf-8">
            <style>
                table{
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h1><a href="/">SQLite로 만든 게시판</a></h1> 
            <hr>
            <h4>${navBar}</h4>
            <hr>
            <form action="/create" method="post">
                <table>
                    <tr><td width="100">제목</td>
                        <td style="text-align: left;"><input type="text"size="40"name="title" ></td></tr>
                    <tr><td>글쓴이</td>
                        <td style="text-align: left;"><input type="text"size="40"name="userId"></td></tr>
                    <tr><td>내용</td>
                        <td style="text-align: left;"><textarea name = "content" rows="5" cols="60"></textarea></td></tr>
                    <tr><td colspan="2"><input type="submit" value="작성"></td></tr>
                </table>
            </form>

        </body>
        </html>`;
}

