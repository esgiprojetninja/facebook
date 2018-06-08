import '../view/graph4.html';
var Copy = require('copy-to-clipboard');

Template.graph4.events({
  'click .copy-iframe' : function(event) {
    event.preventDefault();
    Copy('<iframe src="http://localhost:3000/graph4"></iframe>');
  }
});

Template.graph4.rendered = function() {

  Meteor.call('getCountTweets', function(error, resp) {
    if(error) {
        throw new Meteor.Error("Can't fetch data from db for all count");
    } else {
      var labels = [];
      var data = [];
      var colors = [];
      resp.forEach(function(r, key) {
        labels.push(key.toString());
        data.push(r.retweet_count);
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          colors.push(color);
      });

      var length = 0;
      data.forEach(function(d) {
        length += d;
      });

      $('#len').html(length);
      
      var data = {
        labels: labels,
        datasets: [{
            label: "Nombre de retweet sur les tweets récupérés",
            data: data,
            backgroundColor: colors
        }]
      };

      var myLineChart = new Chart(document.getElementById("graph4chart").getContext('2d'), {
          type: 'bar',
          data: data,
          options: {}
      });
    }
  });
};
