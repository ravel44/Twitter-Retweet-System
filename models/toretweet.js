var mongoose = require("mongoose");

var toretweetSchema = new mongoose.Schema({
    tweetid: String,
	url: String,
	about: String,
    date: Date
});

module.exports = mongoose.model("Toretweet", toretweetSchema);