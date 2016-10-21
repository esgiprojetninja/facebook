import './main.html';

Template.home.onCreated(function helloOnCreated() {
    this.subscribe = new ReactiveVar(false);
});

Template.home.rendered = function(){
    "use strict";
    connectFront.title();
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
    title: function () {

        setTimeout(function () {
            let title = jQuery(".connect .svg-canvas path");

            title.css('fill-opacity', '1');
        }, 3000);
    }
};



