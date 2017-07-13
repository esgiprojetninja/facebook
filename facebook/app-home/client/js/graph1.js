import '../view/graph1.html';

const dataGouvApi = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-atlas_regional-effectifs-d-etudiants-inscrits&facet=rentree_universitaire&facet=niveau_geographique&facet=geo_nom&facet=rgp_formations_ou_etablissements&facet=secteur_de_l_etablissement&facet=sexe_de_l_etudiant&facet=a_des_effectifs_dut&facet=a_des_effectifs_ing&facet=donnees_diffusables&facet=niveau_geo&facet=geo_id&facet=reg_id&facet=aca_id&facet=dep_id&facet=uucr_id&apiKey=81e8ebadf857bcb9dbbc88c37a0dedbb775f60aab10f2c646d49b955";

Template.graph1.rendered = function() {

  $.get(dataGouvApi, function(data) {
    if(data) {
      var rentreUniversitaireTotal = data.facet_groups.find(facetGroup => facetGroup.name === 'rentree_universitaire');
      var rentreUniversitaireParRegion = data.facet_groups.find(facetGroup => facetGroup.name === 'geo_nom');
      var rentreUniversitaireParDepartement = data.facet_groups.find(facetGroup => facetGroup.name === 'dep_id');

      console.log('rentreUniversitaireTotal', rentreUniversitaireTotal);
      console.log('rentreUniversitaireParRegion', rentreUniversitaireParRegion);
      console.log('rentreUniversitaireParDepartement', rentreUniversitaireParDepartement);

      var labels = [];
      var dataSetsCount = [];

      rentreUniversitaireTotal.facets.forEach(function(value, key) {
        labels.push(value.name);
      });

      rentreUniversitaireTotal.facets.forEach(function(value, key) {
        dataSetsCount.push(value.count);
      });

      var data = {
          labels: labels,
          datasets: [{
              label: "Nombre d'étudiants rentrant dans l'enseignement supérieur",
              data: dataSetsCount,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      };

      var options = {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      };

      var myLineChart = new Chart(document.getElementById("graph1chart").getContext('2d'), {
          type: 'bar',
          data: data,
          options: options
      });
    }else {
      throw new Meteor.Error("dataGouvApi error");
    }
  });
};
