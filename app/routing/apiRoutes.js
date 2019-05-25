var path = require("path");

var friends = require('../data/friends.js').friends;

var bestMatch

module.exports = function (app) {


    function indexOfMin(arr) {
        if (arr.length === 0) {
            return -1;
        }

        var min = arr[0];
        var minIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                minIndex = i;
                min = arr[i];
            }
        }

        return minIndex;
    }



    // Routes
    // =============================================================

    // Basic route that sends the user first to the AJAX Page
    app.get("/api/friends", function(req, res) {
        return res.json(friends)
    });

    app.post("/api/friends", function(req, res) {
        var newfriend = req.body;

        // newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase;

        console.log(newfriend);


        // CONVERT EACH USER'S RESULTS INTO A SIMPLE ARRAY OF NUMBERS
        const currentUserScores = newfriend.scores;
        const differenceFromNewFriend = [];

        // COMEPARE DIFFERENCE BETWEEN CURRENT USER'S SCORES AGAINST THOSE FROM OTHERS
        for (let storedUserScores = 0; storedUserScores < friends.length; storedUserScores++) {
            // var indexScores = friends[storedUserScores].scores;
            // console.log(indexScores);
            var totaldifference = 0;
            for (let question = 0; question < currentUserScores.length; question++) {
                totaldifference += Math.abs(currentUserScores[question] - friends[storedUserScores].scores[question]);
            }
            differenceFromNewFriend.push(totaldifference)
            // console.log(differenceFromNewFriend);
        }

        if (friends.length > 0) {

            // calculate friend with closest score to new friend
            // for (let i = 0; i < differenceFromNewFriend.length; i++) {
            //     if (differenceFromNewFriend[i] < differenceFromNewFriend[i+1]) {
            //         bestMatch = differenceFromNewFriend[i];
            //         bestMatchId = i;
            //     }
            // }

            var minimmumDifferenceIndex = indexOfMin(differenceFromNewFriend);

            console.log("Your best match is: " + friends[minimmumDifferenceIndex].name);

            bestMatch = friends[minimmumDifferenceIndex]

            console.log("Your best match is: " + bestMatch);
        }

        friends.push(newfriend);

        // res.json(newfriend);
        res.json(bestMatch);
    });
}