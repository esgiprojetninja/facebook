import '../view/graph2.html';
var Copy = require('copy-to-clipboard');

const dataGouvApi = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-atlas_regional-effectifs-d-etudiants-inscrits&facet=rentree_universitaire&facet=niveau_geographique&facet=geo_nom&facet=rgp_formations_ou_etablissements&facet=secteur_de_l_etablissement&facet=sexe_de_l_etudiant&facet=a_des_effectifs_dut&facet=a_des_effectifs_ing&facet=donnees_diffusables&facet=niveau_geo&facet=geo_id&facet=reg_id&facet=aca_id&facet=dep_id&facet=uucr_id&apiKey=81e8ebadf857bcb9dbbc88c37a0dedbb775f60aab10f2c646d49b955";

Template.graph2.events({
  'click .copy-iframe' : function(event) {
    event.preventDefault();
    Copy('<iframe src="http://localhost:3000/graph2"></iframe>');
  }
});

Template.graph2.rendered = function() {
  
  Meteor.call('getFavoritedTweets', function(error, resp) {
    if(error) {
        throw new Meteor.Error("Can't fetch data from db for all count");
    } else {
        console.log('resp', resp);
    }
  });


  $.get(dataGouvApi, function(data) {
    if(data) {
      var rentreUniversitaireParRegion = data.facet_groups.find(facetGroup => facetGroup.name === 'geo_nom');

      var labelsTmp = [];
      var labels = [];
      var dataSetsCountTmp = [];
      var dataSetsCount = [];

      rentreUniversitaireParRegion.facets.forEach(function(value, key) {
        labelsTmp.push(value.name);
        dataSetsCountTmp.push(value.count);
      });

      function sortNumber(a,b) {
        return a.localeCompare(b);
      }

      labelsTmp.sort(sortNumber);
      labelsTmp.join(",");

      labels = labelsTmp;

      for(var i = 0; i < labels.length; i++) {
        dataSetsCount.push(rentreUniversitaireParRegion.facets.find(reg => labels[i] === reg.name).count);
      }

      var data = {
          labels: labels,
          datasets: [{
              label: "Nombre d'étudiants disponnible par département",
              data: dataSetsCount
          }],
          backgroundColor: "#04B4AE"
      };

      var myLineChart = new Chart(document.getElementById("graph2chart").getContext('2d'), {
          type: 'bar',
          data: data,
          options: {}
      });
    }else {
      throw new Meteor.Error("dataGouvApi error");
    }
  });
};
