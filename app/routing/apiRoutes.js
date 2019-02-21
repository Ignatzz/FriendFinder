var friends = require("../data/friends");

module.exports = function(app) {
  // grabs JSON from friends.js 
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // takes our user info and parses the number answers into intergers
    var user = req.body;
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

      // sets a default best match so we have something to compare match values to. minDiff is set to 40 which is the maximum difference amount possible (all 5s vs. all 1s would be 4x10=40)
    var bestMatch = 2;
    var minDiff= 40;

    // the outer for loop runs through each friend in our friends array. The inner, for each of those friends, calculates the magnitude of differences between the users answers and that particular friends answers. Starting totalDiff is set to zero, and gets added to as the loop. the Math.abs function is used so that negative and positive numbers will be treated in the same way. 

    for(var i = 0; i < friends.length; i++) {
      var totalDiff = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var diff = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDiff += diff;
      }

      // Once that loop is run, we check to see if the totalDiff is less than the min diff. If so, the bestMatch is set to the current friend that the outer loop is iterating, and the minDiff is given a new value equal to the totalDiff. 
      if(totalDiff < minDiff) {
        bestMatch = i;
        minDiff = totalDiff;
      }
    }

    // user data pushed to friends array, best batch gets sent to the browser
    friends.push(user);
    res.json(friends[bestMatch]);
  });
};