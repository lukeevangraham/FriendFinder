var path = require("path");

var friends = require('../data/friends.js').friends;

module.exports = function(app) {

    
    // Routes
    // =============================================================
    
    // Basic route that sends the user first to the AJAX Page
    app.get("/api/friends", function(req, res) {
        return res.json(friends)
    });
    
    app.post("/api/friends", function(req, res) {
        var newfriend = req.body;
        
        newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase;
        
        console.log(newfriend);
        
        friends.push(newfriend);
        
        res.json(newfriend);
    });
}