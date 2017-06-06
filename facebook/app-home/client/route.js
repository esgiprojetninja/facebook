Router.route('/', function(){
    this.render('home');
});

Router.route('/forgot', function(){
    this.render('forgot');
});

Router.route('/datavizualisation', function(){
    this.render('datavizualisation')
});
