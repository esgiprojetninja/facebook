import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

// La variable contenant la bdd Mongo sur le port 3001
const db = new MongoInternals.RemoteCollectionDriver('mongodb://127.0.0.1:3001/meteor');
const studentCollection = db.open('student');
const teacherCollection = db.open('teacher');
const othersCollection = db.open('others');

// Au démarage de Meteor on va exécuter des fonctions pour récupérer les données dans la bdd
Meteor.startup(() => {

  // Ces méthodes sont créer coté serveur afin de sécuriser les données
  Meteor.methods({

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
