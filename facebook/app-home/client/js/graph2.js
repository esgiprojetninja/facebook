import '../view/graph2.html';
var Copy = require('copy-to-clipboard');

Template.graph2.events({
  'click .copy-iframe' : function(event) {
    event.preventDefault();
    Copy('<iframe src="http://localhost:3000/graph2"></iframe>');
  }
});

Template.graph2.rendered = function() {
  
  Meteor.call('getCountryUser', function(error, resp) {
    if(error) {
        throw new Meteor.Error("Can't fetch data from db for all count");
    } else {
        var data = [];
        var keys = Object.keys(resp);
        var colors = [];
        keys.forEach(function(k) {
          data.push(resp[k]);
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          colors.push(color);
        });
        var data = {
          labels: keys,
          datasets: [{
              label: "Nombre d'utilisateur du même pays",
              data: data,
              backgroundColor: colors
          }],
          backgroundColor: "#04B4AE"
        };

        var myLineChart = new Chart(document.getElementById("graph2chart").getContext('2d'), {
            type: 'bar',
            data: data,
            options: {}
        });
    }
  });
};
