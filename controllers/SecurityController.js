module.exports = function(models, app){

    //check if the user is logged
    this.checkAuth = function(req, res, next){
        //check if the user is admin
        if (!req.session.isAdmin) {
            //redirect to login page
            res.redirect(app.locals.routes.login);
        } else {
            //continue to next controller
            next();
        }
        
    };
    
    //get login page
    this.loginGet = function(req, res){
        
        res.render('security/login');
    };
    
    //set login credentials
    this.loginPost = function(req, res){
        
        //get post params
        var post = req.body;
        if (post.login == 'admin' && post.password == 'password') {
            //user is now admin
            req.session.isAdmin = true;
            res.redirect(app.locals.routes.posts);
        } else {
            //redirect to login form
            res.render('security/login', {
                error: 'Invalid login/password'
            });
        }
        
    };
    
    //logout the user
    this.logout = function(req, res){
        //remove the credentials from the session
        delete req.session.isAdmin;
        //redirect to login form
        res.redirect(app.locals.routes.login);
    };
    
    return this;
};