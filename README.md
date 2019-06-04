# Twitter-Retweet-System

In order to constantly drive traffic to my [content](https://pascalguyon.org) from my [500k+](https://twitter.com/pascalguyon), I created this script to randomly select a tweet from a specified set of tweets to be retweeted. The process happens twice a day at strategic times and with randomness added to the timing.

Access to the Twitter API by applying for an app at [https://developer.twitter.com](https://developer.twitter.com).

Create a node app and install the Node-Schedule, Twitter and Mongoose modules.

Create a new cluster at [https://www.mongodb.com](https://www.mongodb.com) to store and retrieve tweet IDs (I like to use a set of 20 to 30 tweets to be randomly retweeted. Therefore it's convenient to add a description for each tweets in the database).
