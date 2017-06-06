import './main.html';

var d3 = require('d3');

// Db on mongodb://127.0.0.1:3001/meteor
// var db = new MongoInternals.RemoteCollectionDriver('mongodb://127.0.0.1:3001/meteor');

// returns instance of Foo2
Template.home.onCreated(function helloOnCreated() {
  this.subscribe = new ReactiveVar(false);
});

Template.home.rendered = function(){
  "use strict";
  connectFront.init();
  cookieBar.init();
  // d3Instance.init();

  //Question 1 : Utilisateur 11

  // var numberOfRelations = db.open('relations').find().count();
  // var userRelations = db.open('relations').find().fetch();

  Meteor.call('getRelations', function(error, result){
    if(error){
      alert('cant get relations db');
    }else{
      console.log('result', result);
    }
  });

  var line1=[['2008-08-12 4:00PM',4], ['2008-09-12 4:00PM',6.5], ['2008-10-12 4:00PM',5.7], ['2008-11-12 4:00PM',9], ['2008-12-12 4:00PM',8.2]];
  var plot1 = $.jqplot('chart1', [line1], {
    title:'Default Date Axis',
    axes:{
        xaxis:{
            renderer:$.jqplot.DateAxisRenderer
        }
    },
    series:[{lineWidth:4, markerOptions:{style:'square'}}]
  });
};

Template.datavizualisation.rendered = function() {
  d3Instance.init();
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

var d3Instance = {
  init : function() {

    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    var format = d3.format(",d");

    var color = d3.scaleOrdinal(d3.schemeCategory20c);

    var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

    d3.csv("flare.csv", function(d) {
      d.value = +d.value;
      if (d.value) return d;
    }, function(error, classes) {
      if (error) throw error;

      var root = d3.hierarchy({children: classes})
      .sum(function(d) { return d.value; })
      .each(function(d) {
        if (id = d.data.id) {
          var id, i = id.lastIndexOf(".");
          d.id = id;
          d.package = id.slice(0, i);
          d.class = id.slice(i + 1);
        }
      });

      var node = svg.selectAll(".node")
      .data(pack(root).leaves())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("circle")
      .attr("id", function(d) { return d.id; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.package); });

      node.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.id; })
      .append("use")
      .attr("xlink:href", function(d) { return "#" + d.id; });

      node.append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
      .selectAll("tspan")
      .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
      .enter().append("tspan")
      .attr("x", 0)
      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
      .text(function(d) { return d; });

      node.append("title")
      .text(function(d) { return d.id + "\n" + format(d.value); });
    });

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
