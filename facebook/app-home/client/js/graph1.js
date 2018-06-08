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
        console.log('resp', resp);
    }
  });

  $.get(dataGouvApi, function(data) {
    if(data) {
      var rentreUniversitaireTotal = data.facet_groups.find(facetGroup => facetGroup.name === 'rentree_universitaire');

      var labelsTmp = [];
      var dataSetsCountTmp = [];
      var labels = [];
      var dataSetsCount = [];

      rentreUniversitaireTotal.facets.forEach(function(value, key) {
        labelsTmp.push(formatDate(value.name));
        dataSetsCountTmp.push(value.count);
      });

      function formatDate (date) {
        if(date) {
          return Number(date.slice(0, 4)) +1;
        }
      }

      function sortNumber(a,b) {
        return a - b;
      }

      dataSetsCountTmp.sort(sortNumber);
      labelsTmp.sort(sortNumber);
      dataSetsCountTmp.join(",");
      labelsTmp.join(",");

      if(dataSetsCountTmp.length === 15 && labelsTmp.length === 15) {
        for(var i = 5; i < dataSetsCountTmp.length; i++) {
          labels.push(labelsTmp[i]);
          dataSetsCount.push(dataSetsCountTmp[i]);
        }
      }

      var data = {
          labels: labels,
          datasets: [{
              label: "Nombre d'étudiants rentrant dans l'enseignement supérieur",
              data: dataSetsCount,
              backgroundColor: 'transparent',
              borderColor: '#04B4AE'
          }]
      };

      var options = {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:false
                  }
              }]
          }
      };

      var myLineChart = new Chart(document.getElementById("graph1chart").getContext('2d'), {
          type: 'line',
          data: data,
          options: options
      });
    }else {
      throw new Meteor.Error("dataGouvApi error");
    }
  });
};
