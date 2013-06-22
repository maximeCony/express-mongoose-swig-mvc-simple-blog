module.exports = function(app, express, mongoose, cons, swig, MongoStore){

    // serve static files
    app.use("/public", express.static(__dirname + '/public'));

    //used to parse Post form
    app.use(express.bodyParser());

    //set swig as view engine
    app.engine('.html', cons.swig);
    app.set('view engine', 'html');

    // NOTE: Swig requires some extra setup
    // This helps it know where to look for includes and parent templates
    swig.init({
        root: __dirname + '/views',
        allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
    });

    //mongodb configuration
    var uristring = 
    process.env.MONGOLAB_URI || 
    process.env.MONGOHQ_URL || 
    'mongodb://localhost/blogNode';

    //session configuration
    app.use(express.cookieParser());
    
    app.use(express.session({
      store: new MongoStore({
        url: uristring
      }),
      secret: 'SECURE'
    }));

    //connect to mongodb
    mongoose.connect(uristring, function (err, res) {
        if (err) { 
          console.log ('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
          console.log ('Succeeded connected to: ' + uristring);
        }
    });

};