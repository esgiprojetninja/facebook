import '../view/main.html';

var Chart = require('chart.js');

Template.home.onCreated(function helloOnCreated() {
    this.subscribe = new ReactiveVar(false);
    this.menu = new ReactiveVar(true);
    this.homeselect = new ReactiveVar(true);
    this.graph1view = new ReactiveVar(false);
    this.graph2view= new ReactiveVar(false);
    this.graph3view = new ReactiveVar(false);
    this.graph4view = new ReactiveVar(false);
    this.graph5view = new ReactiveVar(false);
});

Template.home.helpers({
    isMenu : function() {
        return Template.instance().menu.get();
    },
    isGraph1 : function() {
      return Template.instance().graph1view.get();
    },
    isHomeSelect : function() {
      return Template.instance().homeselect.get();
    },
    isGraph2 : function() {
      return Template.instance().graph2view.get();
    },
    isGraph3 : function() {
      return Template.instance().graph3view.get();
    },
    isGraph4 : function() {
      return Template.instance().graph4view.get();
    },
    isGraph5 : function() {
      return Template.instance().graph5view.get();
    },
});

Template.home.events({
    'click .back-to-menu' : function(event, template) {
        event.preventDefault();
        template.menu.set(true);
        template.homeselect.set(false);
        template.graph1view.set(false);
        template.graph2view.set(false);
        template.graph3view.set(false);
        template.graph4view.set(false);
        template.graph5view.set(false);
    },
    'click #linkto-graph-1' : function(event, template) {
         event.preventDefault();
         template.graph1view.set(true);
         template.homeselect.set(false);
         template.menu.set(false);
    },
    'click #linkto-graph-2' : function(event, template) {
         event.preventDefault();
         template.graph2view.set(true);
         template.homeselect.set(false);
         template.menu.set(false);
    },
    'click #linkto-graph-3' : function(event, template) {
         event.preventDefault();
         template.graph3view.set(true);
         template.homeselect.set(false);
         template.menu.set(false);
    },
    'click #linkto-graph-4' : function(event, template) {
         event.preventDefault();
         template.graph4view.set(true);
         template.homeselect.set(false);
         template.menu.set(false);
    },
    'click #linkto-graph-5' : function(event, template) {
         event.preventDefault();
         template.graph5view.set(true);
         template.homeselect.set(false);
         template.menu.set(false);
    },
    'click #student-load' : function(event, template) {
      event.preventDefault();
    },
    'click #teacher-load' : function(event, template) {
      event.preventDefault();
    },
    'click #other-load' : function(event, template) {
      event.preventDefault();
    }
});

Template.home.rendered = function() {
    "use strict";
    connectFront.init();
    cookieBar.init();

    // Meteor.call('addStudentCount');
    // Meteor.call('getStudentCount', function(error, response) {
    //   if(error) {
    //     console.log('No student');
    //   } else {
    //     console.log('response', response);
    //   }
    // });
};

/** Canvas animation **/
var connectFront = {
    init: function() {
        connectFront.title();
    },
    title: function() {

        setTimeout(function() {
            let title = jQuery(".svg-canvas path");

            title.css('fill-opacity', '1');
        }, 3000);
    }
};

/** Cookie bar **/
var cookieBar = {
    init: function() {
        cookieBar.setCookieBar();

        cookieBar.onClick();
    },
    setCookieBar: function() {
        this._cookieBar = jQuery(".cookie-bar");
    },
    getCookieBar: function() {
        return this._cookieBar;
    },
    onClick: function() {
        cookieBar.getCookieBar().on("click", function(e) {
            jQuery(this).css({
                "transform": "translateY(-100%)",
                "transition": "all .3s"
            })
        });
    }
};

function compressArray(original) {

    var compressed = [];
    // make a copy of the input array
    var copy = original.slice(0);

    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {

        var myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
            if (original[i] == copy[w]) {

                // increase amount of times duplicate is found
                myCount++;
                // sets item to undefined
                delete copy[w];
            }
        }

        if (myCount > 0) {
            var a = new Object();
            a.value = original[i];
            a.count = myCount;
            compressed.push(a);
        }
    }

    return compressed;
};
