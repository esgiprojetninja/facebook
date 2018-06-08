import '../view/graph3.html';
var Copy = require('copy-to-clipboard');

const dataGouvApi = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-atlas_regional-effectifs-d-etudiants-inscrits&facet=rentree_universitaire&facet=niveau_geographique&facet=geo_nom&facet=rgp_formations_ou_etablissements&facet=secteur_de_l_etablissement&facet=sexe_de_l_etudiant&facet=a_des_effectifs_dut&facet=a_des_effectifs_ing&facet=donnees_diffusables&facet=niveau_geo&facet=geo_id&facet=reg_id&facet=aca_id&facet=dep_id&facet=uucr_id&apiKey=81e8ebadf857bcb9dbbc88c37a0dedbb775f60aab10f2c646d49b955";

Template.graph3.events({
  'click .copy-iframe' : function(event) {
    event.preventDefault();
    Copy('<iframe src="http://localhost:3000/graph3"></iframe>');
  }
});

Template.graph3.rendered = function() {

  Meteor.call('getCountryUser', function(error, resp) {
    if(error) {
        throw new Meteor.Error("Can't fetch data from db for all count");
    } else {
        console.log('resp', resp);
    }
  });

  $.get(dataGouvApi, function(data) {
    if(data) {

      var secteur = data.facet_groups.find(facetGroup => facetGroup.name === 'secteur_de_l_etablissement');
      var dataSets = [];

      secteur.facets.forEach(function(element, key) {
        dataSets.push(element.count);
      });

      var data = {
          labels: ['Université', 'Lycée'],
          datasets: [{
              label: "Nombre de projet réalisé",
              data: dataSets,
              backgroundColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)'
              ]
          }]
      };

      var myLineChart = new Chart(document.getElementById("graph3chart").getContext('2d'), {
          type: 'polarArea',
          data: data,
          options: {}
      });
    }else {
      throw new Meteor.Error("dataGouvApi error");
    }
  });
};
