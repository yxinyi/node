
var request = require('superagent');
request.get('http://www.baidu.com/baidu').send({value:'node.js'}).end(function(res){console.log(res.body);});