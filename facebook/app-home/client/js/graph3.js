import '../view/graph3.html';
var Copy = require('copy-to-clipboard');

Template.graph3.events({
  'click .copy-iframe' : function(event) {
    event.preventDefault();
    Copy('<iframe src="http://localhost:3000/graph3"></iframe>');
  }
});

Template.graph3.rendered = function() {

  Meteor.call('getFavoritedTweets', function(error, resp) {
    if(error) {
        throw new Meteor.Error("Can't fetch data from db for all count");
    } else {
        var total = resp.length;
        var nonfavoris = 100-total;
        var dataSets = [];
        dataSets.push(total);
        dataSets.push(nonfavoris);

        var data = {
          labels: ['Favoris', 'Non-favoris'],
          datasets: [{
              label: "Nombre mise en favoris des tweets sur la recherche 'love'",
              data: dataSets,
              backgroundColor: [
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 99, 132, 0.5)'
              ]
          }]
        };

        var myLineChart = new Chart(document.getElementById("graph3chart").getContext('2d'), {
            type: 'polarArea',
            data: data,
            options: {}
        });
    }
  });
};
