Router.route('/', function(){
    this.render('home');
});

Router.route('/datavizualisation', function(){
    this.render('datavizualisation')
});

Router.route('/graph1', function(){
    this.render('iframeG1');
});

Router.route('/graph2', function(){
    this.render('iframeG2');
});

Router.route('/graph3', function(){
    this.render('iframeG3');
});

Router.route('/graph4', function(){
    this.render('iframeG4');
});

Router.route('/graph5', function(){
    this.render('iframeG5');
});
