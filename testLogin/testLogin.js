var express = require('express'),
	users = require('./user');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({type: 'text/html'}));
app.use(cookieParser());
app.use(session({secret: 'yxy secret', cookie: {maxAge: 6000000},  resave: true, saveUninitialized: true }));
app.use(function(req,res,next){
	console.log(req.session.logged_in);
	if('/' == req.url && req.session.logged_in){
		res.writeHead(200, {'Content-Type':'text/html'});
		res.end('Welcome back, <b>'+req.session.name+'<b>' +'<a href="/logout">Logout</a>');
	}
	next();
});

app.use(function(req,res,next){
	if('/' == req.url && 'GET' == req.method){
		res.writeHead(200, {'Content-Type':'text/html'});
		res.end([
			'<form action="/login" method="POST"',
				'<fieldset>',
					'<legend> please login </legend>',
					'<p>User: <input type="text" name="name"></p>',
					'<p>Password: <input type="password" name="password"></p>',
					'<button>submit</button>',
				'</fieldset>',
			'</form>'
			].join(''));
	}
	next();
});

app.use(function(req,res,next){
	if('/login' == req.url && 'POST' == req.method){
		console.log(req.body.name);
		console.log(req.body.password);
		console.log(users);
		res.writeHead(200);
		if(!users[req.body.name] || users[req.body.name].password != req.body.password){
			res.end('please check you name or passwrod');
		}else{
			req.session.logged_in = true;			
			req.session.name = req.body.name;		
			console.log(req.session.logged_in);	
			res.end('Authenticated!');			
		}
	}
	next();
});
app.use(function(req,res,next){
	if('/logout'==req.url){
		req.session.logged_in = false;
		res.writeHead(200);
		res.end('logout ok!');			
	}
});
app.listen(3000);