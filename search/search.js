var qs = require('querystring'),
	http = require('http')

var search = process.argv.slice(2).join('').trim()

if(!search.length){
	return console.log('please enter you want search\n');
}

console.log('search for '+search);
http.request({
	host: 'www.baidu.com',
	//path:'/search.json?'+qs.stringify({q:search})
},function(res){
	var body = '';
	//res.setEncoding('utf8');
	res.on('data', function(chunk){
		body += chunk;
	});
	res.on('end',function(){
				console.log(body);
	});
}).end();