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
        keys.forEach(function(k) {
          data.push(resp[k]);
        });
        var data = {
          labels: keys,
          datasets: [{
              label: "Nombre d'utilisateur du même pays",
              data: data
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
