var http = require('http');
// var User = require('./other.js');
var Teacher = require('./teacher.js');

http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    if (request.url !== '/favicon.ico') {
        fun1(response);
        // 用字符串调用对应的函数
        // let name = 'fun2'
        // other[name](response);
        // other.fun3(response);

        let user = new Teacher(1, 'zhangsan', 20);
        user.enter();
        user.teach(response);
        response.end('');
    }
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');

function fun1(res) {
    console.log('fun1');
    res.write('hello, 我是fun1!');
}