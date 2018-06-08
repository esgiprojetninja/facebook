import '../view/graph1.html';
var Chart = require('chart.js');
var Copy = require('copy-to-clipboard');

const dataGouvApi = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-atlas_regional-effectifs-d-etudiants-inscrits&facet=rentree_universitaire&facet=niveau_geographique&facet=geo_nom&facet=rgp_formations_ou_etablissements&facet=secteur_de_l_etablissement&facet=sexe_de_l_etudiant&facet=a_des_effectifs_dut&facet=a_des_effectifs_ing&facet=donnees_diffusables&facet=niveau_geo&facet=geo_id&facet=reg_id&facet=aca_id&facet=dep_id&facet=uucr_id&apiKey=81e8ebadf857bcb9dbbc88c37a0dedbb775f60aab10f2c646d49b955";

Template.graph1.events({
  'click .copy-iframe' : function(event) {
    event.preventDefault();
    Copy('<iframe src="http://localhost:3000/graph1"></iframe>');
  }
});

Template.graph1.rendered = function() {

  Meteor.call('getRetweetedTweets', function(error, resp) {
    if(error) {
        throw new Meteor.Error("Can't fetch data from db for all count");
    } else {
      var nonretweeted = resp.length;
      var tweeted = 100-tweeted;
      var dataSets = [];
      dataSets.push(nonretweeted);
      dataSets.push(tweeted);

      var data = {
        labels: ['Non-retweeted', 'Retweeted'],
        datasets: [{
            label: "Nombre mise en favoris des tweets sur la recherche 'love'",
            data: dataSets,
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 99, 132, 0.5)'
            ]
        }]
      };

      var myLineChart = new Chart(document.getElementById("graph1chart").getContext('2d'), {
          type: 'polarArea',
          data: data,
          options: {}
      });
    }
  });
};
