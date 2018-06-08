import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
var Future = Npm.require('fibers/future');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'OvofxKUvoisASMfB8HK0cYCjq',
  consumer_secret: '0ZED80WCl8vMVYSbMogc4OpmJppCSd4YfQxNdGNCWCsIYih7ns',
  access_token_key: '711950194712178688-gKvCf0tkZBlOZjWSw4emPIvuJRcAPiq',
  access_token_secret: 'STYHaa7SyB0pJwslGhaaYYpMm02U8x2LEC8Nf5xhRt6t9'
});

// La variable contenant la bdd Mongo sur le port 3001
const db = new MongoInternals.RemoteCollectionDriver('mongodb://127.0.0.1:3001/meteor');
const tweetCollection = db.open('tweet');
const studentCollection = db.open('student');
const teacherCollection = db.open('teacher');
const othersCollection = db.open('others');

// Au démarage de Meteor on va exécuter des fonctions pour récupérer les données dans la bdd
Meteor.startup(() => {

  // Ces méthodes sont créer coté serveur afin de sécuriser les données
  Meteor.methods({
    
    fetchTweets: function() {
      var future = new Future();
      client.get('search/tweets', {q: 'love', count: '100'}, (errors, tweets, resp) => {
        if(errors) {
          future.return(errors);
        } else {
          future.return(tweets);
        }
      });

      return future.wait();
    },

    saveTweets: function(tweets) {
      tweetCollection.update({"name": "tweet"}, { $set : {"value": tweets}});
    },

    getTweets: function() {
      return tweetCollection.find().fetch()[0];
    },

    getRetweetedTweet: function() {
      // var fetched = tweetCollection.find({name: "tweet"}, {value: {$elemMatch: {retweet_count: false}}}).fetch();
      return fetched;
    },

    getRetweetedTweets: function () {
      // var fetched = tweetCollection.find({name: "tweet"}, {value: {$elemMatch: {retweeted: false}}});
      var tweets = [];
      tweetCollection.find().forEach(function(tweet) {
        if(tweet && tweet.value) {
          tweets = tweet.value.filter(t => t && t.retweeted == false);
        }
      });
      return tweets;
    },

    getCountTweets: function() {
      var tweets = [];
      tweetCollection.find().forEach(function(tweet) {
        if(tweet && tweet.value) {
          tweets = tweet.value.filter(t => true);
        }
      });
      return tweets;
    },

    getFavoritedTweets: function() {
      var tweets = [];
      tweetCollection.find().forEach(function(tweet) {
        if(tweet && tweet.value) {
          tweets = tweet.value.filter(t => t && t.favorited == false);
        }
      });
      return tweets;
    },

    getCountryUser: function() {
      // var fetched = tweetCollection.find({name: "tweet"}, {value: {$elemMatch: {retweeted: false}}});
      var country = [];
      var duplicatedCountry = [];
      tweetCollection.find().forEach(function(tweet) {
        if(tweet && tweet.value) {
          var filteredByLocation = tweet.value.filter(t => t && t.user && t.user.location !== null || t.user.location !== undefined);
          filteredByLocation.forEach(function(t) {
            if(t && t.user && t.user.location) {
              country.push(t.user.location);
            }
          });
        }
      });
      var counts = {};
      country.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
      return counts;
    },

    // Méthode Get de chaques collections
    addStudentCount: function() {
     var currentStudentCount = studentCollection.find().fetch()[0].count;

     studentCollection.update({"name" : "studentCount"}, { $set : { "count" : currentStudentCount + 1}});
    },

    addTeacherCount: function() {
      var currentTeacherCount = teacherCollection.find().fetch()[0].count;

      teacherCollection.update({"name" : "teacherCount"}, { $set : { "count" : currentTeacherCount + 1}});
    },

    addOthersCount: function() {
      var currentOthersCount = othersCollection.find().fetch()[0].count;

      othersCollection.update({"name" : "othersCount"}, { $set : { "count" : currentOthersCount + 1}});
    },

    getStudentCount: function() {
      return studentCollection.find().fetch()[0];
    },

    getTeacherCount: function() {
      return teacherCollection.find().fetch()[0];
    },

    getOthersCount: function() {
      return othersCollection.find().fetch()[0];
    },

    getAllCollectionsCount: function() {
      var allCount = {};

      allCount.student = studentCollection.find().fetch()[0].count;
      allCount.teacher = teacherCollection.find().fetch()[0].count;
      allCount.others = othersCollection.find().fetch()[0].count;

      return allCount;
    }

  });
});
