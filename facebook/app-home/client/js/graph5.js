import '../view/graph5.html';

Template.graph5.rendered = function() {

  Meteor.call('getAllCollectionsCount', function(error, response) {
    if(error) {
       console.log('getAllCollectionsCount is empty');
    } else {
      var dataCount = [response.student, response.teacher, response.others];

      console.log(dataCount);

      var data = {
          labels: ["Etudiants", "Professeurs", "Autres"],
          datasets: [{
              label: '# of Votes',
              data: dataCount,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
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

      var myLineChart = new Chart(document.getElementById("graph5chart").getContext('2d'), {
          type: 'bar',
          data: data,
          options: options
      });
    }
  });
};
