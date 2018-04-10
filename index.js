var fs = require('fs'),
stdin = process.stdin;
stdout = process.stdout;
//console.log(require('fs').readdirSync('.'));
//function async (err, files){
//	console.log(files);
//};
//fs.readdir(__dirname,async);
fs.readdir(process.cwd(), function (err, _firles){
	console.log('');
	if(!_firles.length){
		return console.log('	No files to show! \n');
	}
	console.log(' Select which file or directory you want to see \n');

	function file(i){
		var filename = _firles[i];
		fs.stat(__dirname + '/'+filename, function (err, stat){
			if(stat.isDirectory()){
				console.log('	'+ i +filename );
			}else{
				console.log('	'+ i +filename);
			}
			i++;
			if(i == _firles.length){
				read();
			}else{
				file(i);
			}
		})

	}
	file(0);
	function read(){
		console.log('');
		stdout.write("Enter you choice");
		stdin.resume();
		stdin.setEncoding('utf8');
		stdin.on('data',option);
	}
	
	function option(data){
		var filename = _firles[Number(data)];
		if(!filename){
			stdout.write('Enter your choice:');
		}else{
			stdin.pause();
			fs.readFile(__dirname + '/' + filename, 'utf8', function(err,data){
				console.log('');
				console.log(data.replace(/(.*)/g,'	$1'));
			});
		}
	
	}
});
