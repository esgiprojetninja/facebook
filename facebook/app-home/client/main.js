import './main.html';

Template.home.onCreated(function helloOnCreated() {

});

Template.home.rendered = function(){
    "use strict";
    connectFront.title();
};

Template.home.helpers({

});


var connectFront = {
    title: function () {

        setTimeout(function () {
            let title = jQuery(".connect .svg-canvas path");

            title.css('fill-opacity', '1');
        }, 3000);
    }
};


