var connect =  require('connect');
connect.createServer(
	connect.logger('dev'),
	function(req,res){
	res.writeHead(200);
	res.end('Hello world!');		
	}
).listen(3001);