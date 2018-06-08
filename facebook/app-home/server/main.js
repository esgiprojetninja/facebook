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
      client.get('search/tweets', {q: 'love', count: '200'}, (errors, tweets, resp) => {
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
