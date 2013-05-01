module.exports = function(models, routes){

    //check if the user is logged
    this.checkAuth = function(req, res, next){
        //check if the user is admin
        if (!req.session.isAdmin) {
            //redirect to login page
            res.redirect(routes.login);
        } else {
            //continue to next controller
            next();
        }
        
    };
    
    //get login page
    this.loginGet = function(req, res){
        
        res.render('security/login', {
            routes: routes
        });
        
    };
    
    //set login credentials
    this.loginPost = function(req, res){
        
        //get post params
        var post = req.body;
        if (post.login == 'admin' && post.password == 'password') {
            //user is now admin
            req.session.isAdmin = true;
            res.redirect(routes.posts);
        } else {
            //redirect to login form
            res.render('security/login', {
            routes: routes,
            error: 'Invalid login/password'
        });
        }
        
    };
    
    //logout the user
    this.logout = function(req, res){
        //remove the credentials from the session
        delete req.session.userId;
        //redirect to login form
        res.redirect(routes.login);
    };
    
    return this;
};