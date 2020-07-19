const http = require('http');
// 非同期処理用、5秒後にダミーデータを返す
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  setTimeout(() => res.end('{age: 30, id: 0, name: "foo", age: 25, id: 1, name: "bar"}'), 5000);
}).listen(18080 ,() => {
  console.log("dumy server start")
});