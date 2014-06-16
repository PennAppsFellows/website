var express = require('express');
var app = express();        

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
        res.render("index.ejs");
});

app.get('/ideas', function(req, res) {
	res.render('ideas.ejs');
});

app.listen(app.get('port'));
