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
    'click #connect-bottom-subscribe'(event, template){
        event.preventDefault();

        var subscribe = template.subscribe.get();
        template.subscribe.set(!subscribe);
    }
});

Template.home.helpers({
    isSubscribe : function(){
        return Template.instance().subscribe.get();
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

