import '../view/graph5.html';

Template.graph5.rendered = function() {

  Meteor.call('getAllCollectionsCount', function(error, response) {
    if(error) {
      throw new Meteor.Error("Can't fetch data from db for all count");
    } else {
      var dataCount = [response.student, response.teacher, response.others];

      var data = {
          labels: ["Etudiants", "Professeurs", "Autres"],
          datasets: [{
              label: 'Les différents visiteurs',
              data: dataCount,
              backgroundColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(0, 0, 0, 0.1)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255,99,132,1)',
                  'rgba(0, 0, 0, 0.2)'
              ],
              borderWidth: 1
          }]
      };

      var myLineChart = new Chart(document.getElementById("graph5chart").getContext('2d'), {
          type: 'doughnut',
          data: data,
          options: {}
      });
    }
  });
};
