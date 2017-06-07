import './main.html';

var d3 = require('d3');
var Highcharts = require('highcharts');

Template.home.onCreated(function helloOnCreated() {
    this.subscribe = new ReactiveVar(false);
});

// La fonction rendered contient le JS qui va s'exécuter lorsque l'affichage sera crée
Template.home.rendered = function() {
    "use strict";
    connectFront.init();
    cookieBar.init();

    // Question 1 :

    Meteor.call('getRelationsUser', 11, function(error, response) {
        if (error) {
            alert('getRelationsUser is empty');
        } else {
            let relationsDate = [];
            let line1 = [];

            // Si la requête marche on implémente le graphique
            for (var i = 0; i < response.length; i++) {
                relationsDate.push(response[i].date);
            }

            let numberOfOccurence = compressArray(relationsDate);

            for (var j = 0; j < numberOfOccurence.length; j++) {
                line1.push([numberOfOccurence[j].value + ' 4:00PM', numberOfOccurence[j].count]);
            }

            let plot1 = $.jqplot('chart1', [line1], {
                title: "Evolution du nombre d’amis au fil du mois",
                axes: {
                    xaxis: {
                        renderer: $.jqplot.DateAxisRenderer
                    }
                },
                series: [{
                    lineWidth: 4,
                    markerOptions: {
                        style: 'square'
                    }
                }]
            });
        }
    });

    // Question 2 :

    Meteor.call('getNotationsUser', 11, function(error, response) {
        if (error) {
            alert('getNotationsUser is empty');
        } else {
            let relationsDate = [];
            let line1 = [];

            // Si la requête marche on implémente le graphique
            for (var i = 0; i < response.length; i++) {
                relationsDate.push(response[i].date);
            }

            let numberOfOccurence = compressArray(relationsDate);

            for (var j = 0; j < numberOfOccurence.length; j++) {
                line1.push([numberOfOccurence[j].value + ' 4:00PM', numberOfOccurence[j].count]);
            }

            let plot1 = $.jqplot('chart2', [line1], {
                title: "Evolution de la popularité au fil du mois",
                axes: {
                    xaxis: {
                        renderer: $.jqplot.DateAxisRenderer
                    }
                },
                series: [{
                    lineWidth: 4,
                    markerOptions: {
                        style: 'square'
                    }
                }]
            });
        }
    });

    // Question 3:

    Meteor.call('getMessagesUser', 11, function(error, response) {
        if (error) {
            alert('getMessagesUser is empty');
        } else {
            d3Chart3.init(response);
        }
    });

    // Question 4: a la place de 5 vous pouvez changer les id des utilisateurs

    Meteor.call('getRelationsUser', 5, function(error, response) {
        if (error) {
            alert('getRelationsUser is empty');
        } else {
            // var idFriends = [];
            var genderFriends = [];

            for (var i = 0; i < response.length; i++) {

                Meteor.call('getUtilisateursById', response[i].user2, function(errorUtilisateur, responseUtilisateur) {
                    if (errorUtilisateur) {
                        alert('getUtilisateursById is empty');
                    } else {
                        if (responseUtilisateur[0].sexe === 1) {
                            genderFriends.push("male");
                        } else  {
                            genderFriends.push("female");
                        }
                        // genderFriends.push(responseUtilisateur[0].sexe);
                    }

                });
            }

            Array.prototype.numberOfOccurrences = function(n, cb) {
                setTimeout(function()  {
                    var count = 0;
                    for (var m = 0; m < genderFriends.length; m++) {
                        if (genderFriends[m] === n) {
                            count++;
                        }
                    }
                    cb(count);
                }, 1000);
            }

            var friendsRatio = {};

            genderFriends.numberOfOccurrences("male", function(resultMale)  {
                friendsRatio.male = resultMale;
            });

            genderFriends.numberOfOccurrences("female", function(resultFemale)  {
                friendsRatio.female = resultFemale;
            });

            setTimeout(function() {
                friendsRatio.nb = genderFriends.length;

                friendsRatio.malePercent = (friendsRatio.male * 100) / friendsRatio.nb;
                friendsRatio.femalePercent = (friendsRatio.female * 100) / friendsRatio.nb;

                chartq3.init(friendsRatio.malePercent, friendsRatio.femalePercent);

            }, 2000);


        }
    });
};

/** Canvas animation **/
var connectFront = {
    init: function() {
        connectFront.title();
    },
    title: function() {

        setTimeout(function() {
            let title = jQuery(".connect .svg-canvas path");

            title.css('fill-opacity', '1');
        }, 3000);
    }
};

var d3Chart3 = {
    init: function(data) {

        var svg = d3.select("#chart3"),
            margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // x.domain(data.map(function(d) {
        //   // if (error) throw error;
        //
        //     x.domain(data.map(function(d) {
        //         console.log(d);
        //         return d.destinataire;
        //     }));
        //
        //     d.frequency = 0.00772;
        //
        //     console.log(d);
        //
        //     g.append("g")
        //         .attr("class", "axis axis--x")
        //         .attr("transform", "translate(0," + height + ")")
        //         .call(d3.axisBottom(x));
        //
        //     g.append("g")
        //         .attr("class", "axis axis--y")
        //         .call(d3.axisLeft(y).ticks(10, "%"))
        //         .append("text")
        //         .attr("transform", "rotate(-90)")
        //         .attr("y", 6)
        //         .attr("dy", "0.71em")
        //         .attr("text-anchor", "end")
        //         .text("Frequency");
        //
        //     g.selectAll(".bar")
        //         .data(data)
        //         .enter().append("rect")
        //         .attr("class", "bar")
        //         .attr("x", function(d) {
        //             return x(d.destinataire);
        //         })
        //         .attr("y", function(d) {
        //             return y(d.frequency);
        //         })
        //         .attr("width", x.bandwidth())
        //         .attr("height", function(d) {
        //             return height - y(d.frequency);
        //         });
        // }));

        d3.tsv("data.tsv", function(d) {
            d.frequency = +d.frequency;
            return d;
        }, function(error, data) {
            if (error) throw error;

            x.domain(data.map(function(d) {
                return d.letter;
            }));
            y.domain([0, d3.max(data, function(d) {
                return d.frequency;
            })]);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10, "%"))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

            g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) {
                    return x(d.letter);
                })
                .attr("y", function(d) {
                    return y(d.frequency);
                })
                .attr("width", x.bandwidth())
                .attr("height", function(d) {
                    return height - y(d.frequency);
                });
        });
    }
}

var d3Instance = {
    init: function() {

        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var format = d3.format(",d");

        var color = d3.scaleOrdinal(d3.schemeCategory20c);

        var pack = d3.pack()
            .size([width, height])
            .padding(1.5);

        d3.csv("flare.csv", function(d) {
            d.value = +d.value;
            if (d.value) return d;
        }, function(error, classes) {
            if (error) throw error;

            var root = d3.hierarchy({
                    children: classes
                })
                .sum(function(d) {
                    return d.value;
                })
                .each(function(d) {
                    if (id = d.data.id) {
                        var id, i = id.lastIndexOf(".");
                        d.id = id;
                        d.package = id.slice(0, i);
                        d.class = id.slice(i + 1);
                    }
                });

            var node = svg.selectAll(".node")
                .data(pack(root).leaves())
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

            node.append("circle")
                .attr("id", function(d) {
                    return d.id;
                })
                .attr("r", function(d) {
                    return d.r;
                })
                .style("fill", function(d) {
                    return color(d.package);
                });

            node.append("clipPath")
                .attr("id", function(d) {
                    return "clip-" + d.id;
                })
                .append("use")
                .attr("xlink:href", function(d) {
                    return "#" + d.id;
                });

            node.append("text")
                .attr("clip-path", function(d) {
                    return "url(#clip-" + d.id + ")";
                })
                .selectAll("tspan")
                .data(function(d) {
                    return d.class.split(/(?=[A-Z][^A-Z])/g);
                })
                .enter().append("tspan")
                .attr("x", 0)
                .attr("y", function(d, i, nodes) {
                    return 13 + (i - nodes.length / 2 - 0.5) * 10;
                })
                .text(function(d) {
                    return d;
                });

            node.append("title")
                .text(function(d) {
                    return d.id + "\n" + format(d.value);
                });
        });

    }
};


/** Cookie bar **/
var cookieBar = {
    init: function() {
        cookieBar.setCookieBar();

        cookieBar.onClick();
    },
    setCookieBar: function() {
        this._cookieBar = jQuery(".cookie-bar");
    },
    getCookieBar: function() {
        return this._cookieBar;
    },
    onClick: function() {
        cookieBar.getCookieBar().on("click", function(e) {
            jQuery(this).css({
                "transform": "translateY(-100%)",
                "transition": "all .3s"
            })
        });
    }
};

var chartq3 = {
    init: function(malePercent, femalePercent)  {
        Highcharts.chart('chart4', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Pourcentage d’amis masculin et féminin'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: "Pourcentage d\'amis"
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },

            series: [{
                name: 'Sexe',
                colorByPoint: true,
                data: [{
                    name: 'Homme',
                    y: malePercent
                }, {
                    name: 'Femme',
                    y: femalePercent
                }]
            }],
        });
    }
};

function compressArray(original) {

    var compressed = [];
    // make a copy of the input array
    var copy = original.slice(0);

    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {

        var myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
            if (original[i] == copy[w]) {

                // increase amount of times duplicate is found
                myCount++;
                // sets item to undefined
                delete copy[w];
            }
        }

        if (myCount > 0) {
            var a = new Object();
            a.value = original[i];
            a.count = myCount;
            compressed.push(a);
        }
    }

    return compressed;
};
