import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });

    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '1200139990052440',
        secret: '7ed0f55fd08612a805b851fa6fbde893'
    });
});
