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
	var ideas = req.params.idea;

	var Schema = mongoose.Schema;

	var VoteSchema = new Schema({
		email: {type: "String"},
	 	idea: {type: "Number"}
	});

	var Vote = mongoose.model('Vote', VoteSchema, 'Votes');

	//if email is found, it will be passed into the callback function's "entry" parameter.
	Vote.findOne({ 'email': email }, function(err1, entry) {
		if(err1) {
			res.send(500, {error: "There was an error during the database lookup."});
		}

		//if entry is null, add the vote.
		if(entry == null) {

			for (var i = 0; i < ideas.length; i++) {
				var vote = new Vote({email: email, idea: ideas[i]});
				
				vote.save(function(err2, data) {
					if(err2) {
						console.log("There was an error: " + err);
						res.send(500, {error: "There was an error saving the vote, please try again."});
					}
					else {
						res.send(200);
					}
				});
			}
		}
		//otherwise, send back a bad request. Do not save anything to the db.
		else {
			res.send(500, {error: "Voter has already voted."});
		}

	});

});

app.listen(app.get('port'));
