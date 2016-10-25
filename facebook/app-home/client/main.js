import './main.html';

Template.home.onCreated(function helloOnCreated() {
    this.subscribe = new ReactiveVar(false);
});

Template.home.rendered = function(){
    "use strict";
    connectFront.init();
    cookieBar.init();
};

Template.home.events({
    'click #ninja-btn-login' : function(){
        console.log("Login.");
    },
    'click #connect-bottom-subscribe'(event, template){
        event.preventDefault();

        var subscribe = template.subscribe.get();
        template.subscribe.set(!subscribe);
    },
    'click #facebook-login': function(event) {
        console.log("Facebook login.");

        Meteor.loginWithFacebook({}, function(err){
            if(err){
                throw new Meteor.Error("Facebook login failed");
                jQuery('#myModal').modal("show");
            }else{
                jQuery('#myModal').modal("show");
            }
        });
    },
    'click #facebook-logout': function(event) {
        console.log("Facebook logout.");

        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Facebook logout failed");
                jQuery('#myModal').modal("hide");
            }else{
                jQuery('#myModal').modal("hide");
            }
        });
    }
});

Template.home.helpers({
    isSubscribe : function() {
        return Template.instance().subscribe.get();
    },
    userImage: function(){
        if(Meteor.user().services.facebook){
            return 'https://graph.facebook.com/' + Meteor.user().services.facebook.id + '/picture/?type=large';
        }else{
            return 'http://placehold.it/40×40';
        }
    }
});

/** Canvas animation **/
var connectFront = {
    init : function(){
      connectFront.title();
    },
    title: function () {

        setTimeout(function () {
            let title = jQuery(".connect .svg-canvas path");

            title.css('fill-opacity', '1');
        }, 3000);
    }
};


/** Cookie bar **/
var cookieBar = {
    init : function(){
        cookieBar.setCookieBar();

        cookieBar.onClick();
    },
    setCookieBar : function(){
        this._cookieBar = jQuery(".cookie-bar");
    },
    getCookieBar : function(){
        return this._cookieBar;
    },
    onClick : function(){
        cookieBar.getCookieBar().on("click", function(e){
            jQuery(this).css({"transform" : "translateY(-100%)", "transition" : "all .3s"})
        });
    }
};

