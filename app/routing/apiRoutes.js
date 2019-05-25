var path = require("path");

var friends = require('../data/friends.js').friends;

module.exports = function (app) {


    // Routes
    // =============================================================

    // Basic route that sends the user first to the AJAX Page
    app.get("/api/friends", function (req, res) {
        return res.json(friends)
    });

    app.post("/api/friends", function (req, res) {
        var newfriend = req.body;

        // newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase;

        console.log(newfriend);

        
        // CONVERT EACH USER'S RESULTS INTO A SIMPLE ARRAY OF NUMBERS
        const currentUserScores = newfriend.scores;
        const differenceFromNewFriend = [];
        
        // COMEPARE DIFFERENCE BETWEEN CURRENT USER'S SCORES AGAINST THOSE FROM OTHERS
        for (let storedUserScores = 0; storedUserScores < friends.length; storedUserScores++) {
            var indexScores = friends[storedUserScores].scores;
            // console.log(indexScores);
            var totaldifference = 0;
            for (let question = 0; question < currentUserScores.length; question++) {
                totaldifference += Math.abs(currentUserScores[question] - friends[storedUserScores].scores[question]);
                console.log("difference: " + totaldifference);
            }
            differenceFromNewFriend.push(totaldifference)
            console.log(friends[storedUserScores].name + differenceFromNewFriend);
        }
        
        friends.push(newfriend);

        res.json(newfriend);
    });
}