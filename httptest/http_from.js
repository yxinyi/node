var qs =  require('querystring');
require('http').createServer(function(req,res){
	if('/' == req.url){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end([
			'<form method="POST" action="/url">',
			'<h1>My form</h1>',
			'<fieldset>',
			'<label> Personal information</label>',
			'<p>What is your name</p>',
			'<input type="text" name="name">',
			'<p><button>submit</button></p>',
			'</form>'
			].join(''));
	}else if('/url' == req.url && 'POST' == req.method){
		console.log('in url');
		var body ='';
		req.on('data',function(chunk){
			body += chunk;
		});
		console.log(body);
		req.on('end',function(){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end('<p>you name is <b>'+body+ '</b></p>');
			console.log('in url222');
		});
	}else{
		res.writeHead(404);
		res.end('Not Found');
	}
}).listen(3002);