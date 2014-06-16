var express = require('express');
var app = express();        

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
        res.render("index.ejs");
});

app.get('/ideas', function(req, res) {
	res.render('ideas.ejs');
});

app.listen(80);  



