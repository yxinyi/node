var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
app.use(serveStatic('static'));
app.use(bodyParser.text({type:'text/plain'}));
app.get('/', function(req, res){
    console.log(req.body.file);
});
app.listen(3000);
console.log('Server running at http://127.0.0.1:1337/');