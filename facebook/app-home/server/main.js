import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  Meteor.methods({
	  getRelations: function () {
      var db = new MongoInternals.RemoteCollectionDriver('mongodb://127.0.0.1:3001/meteor');
      var numberOfRelations = db.open('relations').find().count();
      var userRelations = db.open('relations').find().fetch();

      console.log('userRelations', userRelations);

	    return userRelations;
	  }
  });
});
