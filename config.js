module.exports = function(app, express, mongoose, cons, swig){

    // serve static files
    app.use("/public", express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    
    
    app.use(express.cookieParser()); 
    var MemStore = express.session.MemoryStore;
    app.use(express.session({
        secret: 'admin'
    }));

    app.engine('.html', cons.swig);
    app.set('view engine', 'html');

    // NOTE: Swig requires some extra setup
    // This helps it know where to look for includes and parent templates
    swig.init({
        root: __dirname + '/views',
        allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
    });

    var uristring = 
    process.env.MONGOLAB_URI || 
    process.env.MONGOHQ_URL || 
    'mongodb://localhost/blogNode';

    mongoose.connect(uristring, function (err, res) {
      if (err) { 
          console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
          console.log ('Succeeded connected to: ' + uristring);
      }
  });

};