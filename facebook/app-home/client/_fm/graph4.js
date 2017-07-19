import '../view/_fm/graph4.html';

const dataGouvApi = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-atlas_regional-effectifs-d-etudiants-inscrits&facet=rentree_universitaire&facet=niveau_geographique&facet=geo_nom&facet=rgp_formations_ou_etablissements&facet=secteur_de_l_etablissement&facet=sexe_de_l_etudiant&facet=a_des_effectifs_dut&facet=a_des_effectifs_ing&facet=donnees_diffusables&facet=niveau_geo&facet=geo_id&facet=reg_id&facet=aca_id&facet=dep_id&facet=uucr_id&apiKey=81e8ebadf857bcb9dbbc88c37a0dedbb775f60aab10f2c646d49b955";

Template.iframeG4.rendered = function() {

  $.get(dataGouvApi, function(data) {
    if(data) {

      var secteur = data.facet_groups.find(facetGroup => facetGroup.name === 'niveau_geo');
      var dataSets = [];

      secteur.facets.forEach(function(element, key) {
        dataSets.push(element.count);
      });

      dataSets[0] = 60000;

      var data = {
          labels: ['Développeur', 'Marketeur', 'Designer', 'Directeur artistique', 'Chef de projet'],
          datasets: [{
              label: "Nombre d'étudiant par secteur choisi",
              data: dataSets
          }],
          backgroundColor: 'rgba(54, 162, 235, 1)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
      };

      var myLineChart = new Chart(document.getElementById("graph4chart").getContext('2d'), {
          type: 'radar',
          data: data,
          options: {}
      });
    }else {
      throw new Meteor.Error("dataGouvApi error");
    }
  });
};
