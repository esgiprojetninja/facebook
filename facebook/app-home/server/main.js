import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

// La variable contenant la bdd Mongo sur le port 3001
const db = new MongoInternals.RemoteCollectionDriver('mongodb://127.0.0.1:3001/meteor');

// Au démarage de Meteor on va exécuter des fonctions pour récupérer les données dans la bdd
Meteor.startup(() => {

  // Ces méthodes sont créer coté serveur afin de sécuriser les données
  Meteor.methods({

    // Méthode Get de chaques collections
	  getRelations: function () {
      var numberOfRelations = db.open('relations').find().count();
      var userRelations = db.open('relations').find().fetch();

	    return userRelations;
	  },

    getRelationsUser: function(number) {
      var numberOfRelations = db.open('relations').find().count();
      var user = db.open('relations').find({user1: number}).fetch();

      return user;
    },

    getNotations: function () {
      var numberOfNotations = db.open('notations').find().count();
      var userNotations = db.open('notations').find().fetch();

      return userNotations;
    },

    getNotationsUser: function(number) {
      var numberOfNotations = db.open('notations').find().count();
      var user = db.open('notations').find({noteur: number}).fetch();

      return user;
    },

    getMessages: function () {
      var numberOfMessages = db.open('messages').find().count();
      var userMessages = db.open('messages').find().fetch();

      return userMessages;
    },

    getMessagesUser: function(number) {
      var numberOfMessages = db.open('messages').find().count();
      var user = db.open('messages').find({emetteur: number}).fetch();

      return user;
    },

    getPhotos: function () {
      var numberOfPhotos = db.open('photos').find().count();
      var userPhotos = db.open('photos').find().fetch();

      return userPhotos;
    },

    getStatus: function () {
      var numberOfStatus = db.open('status').find().count();
      var userStatus = db.open('status').find().fetch();

      return userStatus;
    },

    getUtilisateurs: function () {
      var numberOfUtilisateurs = db.open('utilisateurs').find().count();
      var userUtilisateurs = db.open('utilisateurs').find().fetch();

      return userUtilisateurs;
    },

    getUtilisateursById: function (id) {
      var numberOfUtilisateurs = db.open('utilisateurs').find().count();
      var user = db.open('utilisateurs').find({id: id}).fetch();

      return user;
    }
  });
});
