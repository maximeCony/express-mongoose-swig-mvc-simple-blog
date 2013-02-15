module.exports = function(models, routes){

    this.checkAuth = function(req, res, next){
        
        if (!req.session.userId) {
            res.redirect(routes.login);
        } else {
            next();
        }
        
    };
    
    this.loginGet = function(req, res){
        
        res.render('security/login', {
            title: 'Login',
            routes: routes
        });
        
    };
    
    this.loginPost = function(req, res){
        
        var post = req.body;
        if (post.login == 'admin' && post.password == 'password') {
            req.session.userId = 'admin';
            res.redirect(routes.posts);
        } else {
            res.render('security/login', {
            title: 'Log in',
            routes: routes,
            error: 'Invalid login/password'
        });
        }
        
    };
    
    this.logout = function(req, res){
        delete req.session.userId;
        res.redirect(routes.login);
    };
    
   
    
    return this;
};