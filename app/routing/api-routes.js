// Required files for exports and npm package installs
var friendsData = require('../data/finder.js');
var userInfo = require('../data/userData.js');
var path = require('path');




// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests

	app.get('/api/finder', function(req, res){
		res.json(friendsData);
	});

	app.get('/api/userData', function(req, res){
		res.json(userInfo);
	});


var userData = []; 

app.post('/api/finder', function(req, res){

	clearMatch();

	var bestMatch = req.body;
	var result;

	console.log(bestMatch);
	console.log(userData);
	userData.push(bestMatch);

	res.json(bestMatch);


	var friendScores;
	var totalDiff;
	var results = [];
	var ratingArray = [];
	var counter = 0;
	var lowest;

	function getSum(total, num) {
    		return total + num;
	};

	function clearMatch() {
		userInfo = [];
	}

	// Use Math.abs() so the difference between the values is NOT negative, then add the differences together for best match
	for (var i = 0; i < friendsData.length; i++) {

			friendScores = friendsData[i].scores;
			
			for (var j = 0; j < bestMatch.scores.length; j++) {
			results.push(Math.abs(bestMatch.scores[j] - friendScores[j]));
			}

			totalDiff = results.reduce(getSum);
			friendsData[i].rating = totalDiff;
			console.log(friendsData[i].rating);
			counter++;

			results = [];

			ratingArray.push(friendsData[i].rating);
	}
		
	if (counter === friendsData.length) {
		Math.max.apply(null, ratingArray);
		lowest = Math.min.apply(null, ratingArray);
		console.log(lowest);
	}

	for (var i = 0; i < friendsData.length; i++) {
		if (friendsData[i].rating == lowest) {
			userInfo.push(friendsData[i]);
		};

		friendsData[i].rating = 0;
	}

	console.log(userInfo);

	friendsData.push(bestMatch);

	

	})
}