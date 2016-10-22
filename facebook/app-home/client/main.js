import './main.html';

Template.home.onCreated(function helloOnCreated() {
    this.subscribe = new ReactiveVar(false);
});

Template.home.rendered = function(){
    "use strict";
    connectFront.init();
    inputAnimation.init();
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

/** Input animation line **/
var inputAnimation = {
    init : function(){
        inputAnimation.onFocus();
    },
    onFocus : function(){
        jQuery(".ninja-input-text").on("focus", function(e){
            jQuery(e.currentTarget).parent().animate({"border-color": "yellow"}, "slow");
        });
    }
};


