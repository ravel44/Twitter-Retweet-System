var Twitter = require('twitter'); // https://www.npmjs.com/package/twitter
var schedule = require('node-schedule'); //https://www.npmjs.com/package/node-schedule
const mongoose = require('mongoose'); //https://www.npmjs.com/package/mongoose
var Toretweet = require("./models/toretweet");

// connection DB-----------------------------------------
mongoose.connect('yourstringconnection', {
	userNewUrlParser: true,
	useCreateIndex: true
}).then(() =>{
	console.log("connected to db");
}).catch(err=>{
	console.log('ERROR: ', err.message);
});

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

//load tweet IDs from database
var tweetIDs = [];
function loadTweets(){
	Toretweet.find({}, (err,toretweetObject)=>{ 
		if (err){
			console.log(err);
		}else{
			console.log(toretweetObject);
			toretweetObject.forEach(function(data){
				tweetIDs.push(data.tweetid);
			});
		}
	});
}
loadTweets();

function getRandomMinutes(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//NIGHT
schedule.scheduleJob('00 15 04 * * *', function(fireDate){ //GMT = LA time + 7
  console.log('STARTING UNRETWEET - RETWEET PROCESS ' + fireDate + ', BUT ACTUALLY RAN AT ' + new Date());
	var minutesDelayProcess = getRandomMinutes(20,40);
  	setTimeout(function(){runProcess();}, minutesDelayProcess*60*1000);
});

//MORNING
schedule.scheduleJob('00 29 13 * * *', function(fireDate){ //  
  console.log('STARTING UNRETWEET - RETWEET PROCESS ' + fireDate + ', BUT ACTUALLY RAN AT ' + new Date());
  	var minutesDelayProcess = getRandomMinutes(20,40);
  	setTimeout(function(){runProcess();}, minutesDelayProcess*60*1000);
});

//=======================================================================================

function runProcess(){
	var randomlyChoosenTweet =  tweetIDs[Math.floor(Math.random() * tweetIDs.length)];
	unRetweet(randomlyChoosenTweet);
	var minutesDelayRetweet = getRandomMinutes(20,40);
	console.log('RETWEET WILL HAPPEN IN :' + minutesDelayRetweet + ' MINS');
	setTimeout(function(){retweet(randomlyChoosenTweet);}, minutesDelayRetweet*60*1000); 
}

function retweet(randomlyChoosenTweet){
	client.post('statuses/retweet/' + randomlyChoosenTweet + '.json',  function(error, tweet, response) {
	  if(error){
		  console.log(error);
	  }else{
	  console.log("Retweeted :" + tweet.text);
	}
	});
}

function unRetweet(randomlyChoosenTweet){
	client.post('statuses/unretweet/' + randomlyChoosenTweet + '.json',  function(error, tweet, response) {
	  if(error){
		  console.log(error);
	  }else{
	  console.log("Unretweeted: " + tweet.text); 
	}
	});
}

// To add a set of tweets to the database:
// function addTweetsToDb(){
// 	tweetIds = ['fillInYourTweetIds','fillInYourTweetIds'];
// 	tweetIds.forEach(function(data){
// 		Toretweet.create({}, (err, toretweet)=>{
// 			return new Promise( function(resolve) {
// 				toretweet.tweetid = data;
// 				toretweet.date = new Date();
// 				toretweet.url = 'https://twitter.com/yourtwitterusername/status/' + data;
// 				toretweet.about = '';
// 				toretweet.save()
// 					.then(item => {
// 					 console.log("added");
// 					 })
// 					.then(function(){
// 					resolve('worked out');
// 					})
// 					.catch(err => {
// 						 if(err)
// 					console.log(err);
// 					});
// 			});
// 		});			 
// 	});
// }
// addTweetsToDb();
