module.exports.delete = function( navBar,row){
    return `
    <!DOCTYPE html>
        <html>
        <head>
            <title>Express Web</title>
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
            <h2>글 삭제하기</h2>
            <form action="/delete" method="post">
            <input type="hidden" name="id" value="${row.id}">
            <p>${row.title} 글을 삭제하시겠습니까?</p>
            <p><input type="submit" value="확인"></p>
        </form>
    </body>
    </html>`;

}