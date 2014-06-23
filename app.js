var express = require('express');
var app = express();

//Mongoose and connection to MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
        res.render("index.ejs");
});

app.get('/projectphl', function(req, res) {
	res.render('projectphl.ejs');
});

app.post('/vote', function(req, res) {
	var email = req.params.email;
	var idea = req.params.idea;

	var VoteSchema = new Schema({
		email: {type: "String"},
	 	idea: {type: "String"}
	});

	var Vote = mongoose.model('Vote', VoteSchema);

	var query = Vote.findOne({ 'email': email });

	if(!query) {
		var vote = new Vote({email: email, idea: idea});
		
		vote.save(function(err, data){
			if(err) {
				console.log(err);
				res.send(500, {error: "There was an error saving the vote, please try again"});
			}
			else {
				res.send(200);
			}
		});
	}
	
	else {
		res.send(500, {error: "Voter has already voted."});
	}

});

app.listen(app.get('port'));
