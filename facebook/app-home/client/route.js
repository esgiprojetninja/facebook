Router.route('/', function(){
    this.render('home');
});

Router.route('/subscribe', function(){
    this.render('subscribe');
});

Router.route('/forgot', function(){
    this.render('forgot');
});